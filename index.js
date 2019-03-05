var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
Genres = require("./models/genre");
Books = require("./models/book");
mongoose.connect(
  "mongodb://Library:hamza123@ds147125.mlab.com:47125/booklibrary"
);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var db = mongoose.connection;
app.get("/", (req, res) => {
  res.send("Test this world");
});

//for genres
app.get("/api/genres", (req, res) => {
  Genres.getGenres((err, genres) => {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});
// create genres
app.post("/api/genres", function(req, res) {
  var genre = req.body;
  Genres.addGenre(genre, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});
// get genres by id
app.get("/api/genre/:id", (req, res) => {
  Genres.getGenreById(req.params.id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

// update genre by id
app.put("/api/genre/:id", (req, res) => {
  console.log(req.params.id);
  var id = req.params.id;
  var genre = req.body;
  Genres.updateGenreById(id, genre, {}, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

// delete genre
app.delete("/api/genre/:id", (req, res) => {
  var id = req.params.id;
  Genres.removeGenreById(id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

// get all books
app.get("/api/books", (req, res) => {
  Books.getBooks((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// add new book
app.post("/api/books", (req, res) => {
  var book = req.body;
  Books.addBook(book, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

// get book by id
app.get("/api/book/:id", (req, res) => {
  Books.getBookById(req.params.id, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

// update book by id
app.put("/api/book/:id", (req, res) => {
  //console.log(req.params.id);
  var id = req.params.id;
  var book = req.body;
  Books.updateBookById(id, book, {}, (err, book) => {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

// delete book
app.delete("/api/book/:id", (req, res) => {
  var id = req.params.id;
  Genres.removeBookById(id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.listen(8080, () => {
  console.log("App is listening at 8080");
});
