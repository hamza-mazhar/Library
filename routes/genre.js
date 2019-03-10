const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Genre = require("../models/genre");
const checkAuth = require("../middleware/check-auth");

//const checkAuth = require("./middleware/check-auth");
//get genre /api/genres
router.get("/genres", checkAuth, (req, res, next) => {
  Genre.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// get genres by id
router.get("/genre/:id", checkAuth, (req, res) => {
  Genre.findById(req.params.id)
    .exec()
    .then((result, err) => {
      if (err) {
        res.status(500).json({
          message: "Server Error"
        });
      }
      res.send(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Server Error"
      });
    });
});

// create genres
router.post("/genres", checkAuth, (req, res) => {
  Genre.find({ name: req.body.name })
    .exec()
    .then(genre => {
      if (genre.length >= 1) {
        return res.status(409).json({
          message: "Genre Exists"
        });
      } else {
        const genre = new Genre({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name
        });
        genre
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Genre Created"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
});

// update genre by id
router.put("/genre/:id", checkAuth, (req, res) => {
  var query = { _id: req.params.id };
  var update = {
    name: req.body.name
  };
  var options = {};
  Genre.findOneAndUpdate(query, update, options)
    .exec()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Genre Updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//deleted the genre by id
router.delete("/genre/:id", checkAuth, (req, res, next) => {
  Genres.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Genre deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
