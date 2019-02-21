var mongoose = require("mongoose");

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genres: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  pages: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  buy_url: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Book = (module.exports = mongoose.model("Book", bookSchema));
// get all
module.exports.getBooks = (callback, limit) => {
  Book.find(callback).limit(limit);
};
// get single

// module.exports.getBookById = (id, callback) => {
//   Book.findById(id, callback);
// };
