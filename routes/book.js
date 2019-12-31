const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/book");

const checkAuth = require("../middleware/check-auth");
//get all books /api/books
router.get("/books", checkAuth, (req, res, next) => {
  console.log("==================");
  console.log(req.userData);

  console.log(req.body);
  console.log(req.headers.authorization);
  console.log("==================");
  Book.find({ user_id: req.userData.userId })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// get book by id
router.get("/book/:id", checkAuth, (req, res) => {
  Book.findById(req.params.id)
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

// create book
router.post("/book", checkAuth, (req, res) => {
  console.log("+++++++++++++++");
  console.log(req.body);
  console.log(req.userData);
  console.log("+++++++++++++++");

  Book.find({ title: req.body.title })
    .exec()
    .then(genre => {
      if (genre.length >= 1) {
        return res.status(409).json({
          message: "Book Exist Already"
        });
      } else {
        const book = new Book({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          genres: req.body.genres,
          author: req.body.author,
          publisher: req.body.publisher,
          pages: req.body.pages,
          description: req.body.desc,
          image_url: req.body.image_url,
          buy_url: req.body.buy_url,
          user_id: req.userData.userId
        });
        console.log("book object is =>", book);
        book
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "Book Created"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err,
              message: "something not working "
            });
          });
      }
    });
});

// update book by id
router.put("/book/:id", checkAuth, (req, res) => {
  var query = { _id: req.params.id };
  var update = {
    title: req.body.title,
    genres: req.body.genres,
    author: req.body.author,
    publisher: req.body.publisher,
    description: req.body.desc,
    pages: req.body.pages,
    image_url: req.body.image_url,
    buy_url: req.body.buy_url
  };
  var options = {};
  Book.findOneAndUpdate(query, update, options)
    .exec()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Book Updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//deleted the book by id
router.delete("/book/:id", checkAuth, (req, res, next) => {
  Book.remove({ _id: req.params.id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Book deleted"
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
