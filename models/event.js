var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("Event", eventSchema);
