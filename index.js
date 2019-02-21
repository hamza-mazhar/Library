var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
Genres = require("./models/genre");
Books = require("./models/book");
mongoose.connect(
  "mongodb://Library:hamza123@ds147125.mlab.com:47125/booklibrary"
);

var db = mongoose.connection;
app.get("/", (req, res) => {
  res.send("Test this world");
});

app.get("/api/genres", (req, res) => {
  Genres.getGenres((err, genres) => {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.get("/api/books", (req, res) => {
  Books.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    //console.log(books);
    res.send(books);
  });
});

app.get("/api/book/:id", (req, res) => {
  Books.getBookById(req.params.id, (err, book) => {
    if (err) {
      throw err;
    }
    console.log(book);
    res.send(book);
  });
});

app.listen(8080, () => {
  console.log("App is listening at 8080");
});
