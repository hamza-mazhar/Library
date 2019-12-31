var mongoose = require("mongoose");
var bookSchema = require("./book").schema;
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  books: [bookSchema],
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  reset_password_token: {
    type: String
  },
  reset_password_expires: {
    type: Date
  }
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
