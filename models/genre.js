var mongoose = require("mongoose");

//Schema
var genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Genre", genreSchema);
