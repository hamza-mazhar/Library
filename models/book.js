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
module.exports = mongoose.model("Book", bookSchema);
