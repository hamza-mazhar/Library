const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

var async = require("async");
var crypto = require("crypto");

var bcrypt = require("bcrypt");
var hbs = require("nodemailer-express-handlebars");
var path = require("path");
var email = process.env.EMAIL;
var pass = process.env.PASSWORD;
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass
  }
});
const handlebarOptions1 = {
  viewEngine: {
    extName: ".html",
    partialsDir: path.resolve("./forgot-password-email"),
    layoutsDir: path.resolve("./forgot-password-email"),
    defaultLayout: ""
  },
  viewPath: path.resolve(""),
  extName: ".html"
};

transporter.use("compile", hbs(handlebarOptions1));
// create new users here
router.post("/signup", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email Exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: "User Created"
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

// check user is valid
router.post("/login", (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed!"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed!"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "secret",
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth Successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth Failed!"
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// delete exisiting user here
router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/forgot_password", (req, res) => {
  console.log("======================email is", req.body);
  async.waterfall(
    [
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            console.log("====+++++++++======", user);

            done(err, user);
          } else {
            console.log("====+++++++++======");

            done("User not found.");
          }
        });
      },
      function(user, done) {
        // create the random token
        console.log("====+++++++++======", user);

        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString("hex");
          done(err, user, token);
        });
      },
      function(user, token, done) {
        console.log("====+++++++++======", token);

        User.findByIdAndUpdate(
          { _id: user._id },
          {
            reset_password_token: token,
            reset_password_expires: Date.now() + 86400000
          },
          { upsert: true, new: true }
        ).exec(function(err, new_user) {
          console.log("====+++++++++====== new user", new_user);

          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        var data = {
          to: user.email,
          from: email,
          template: "forgot-password-email",
          subject: "Password help has arrived!",
          context: {
            url: "http://localhost:3030/newPass/" + token
          }
        };
        console.log("====+++++++++====== new data", data);

        transporter.sendMail(data, (err, res) => {
          if (!err) {
            console.log("eeeeeeeemail=============>", res);
            return res.json({
              message: "Kindly check your email for further instructions"
            });
          } else {
            console.log("err=============>", err);

            return done(err);
          }
        });
      }
    ],
    function(err) {
      return res.status(422).json({ message: err });
    }
  );
});

/**
 * Reset password
 */

router.post("/reset_password", (req, res, next) => {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function(err, user) {
    if (!err && user) {
      if (req.body.password === req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        user.save(function(err) {
          if (err) {
            return res.status(422).send({
              message: err
            });
          } else {
            var data = {
              to: user.email,
              from: email,
              template: "reset-password-email",
              subject: "Password Reset Confirmation"
            };

            transporter.sendMail(data, function(err) {
              if (!err) {
                return res.json({ message: "Password reset" });
              } else {
                return done(err);
              }
            });
          }
        });
      } else {
        return res.status(422).send({
          message: "Passwords do not match"
        });
      }
    } else {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired."
      });
    }
  });
});

module.exports = router;
