var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
Books = require("./models/book");

//const checkAuth = require("./middleware/check-auth");
const userRoutes = require("./routes/user");
const genreRoutes = require("./routes/genre");
const bookRoutes = require("./routes/book");
mongoose.connect(
  "mongodb://Library:hamza123@ds147125.mlab.com:47125/booklibrary"
);
var db = mongoose.connection;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//for user Api
app.use("/user", userRoutes);
app.use("/api", genreRoutes);
app.use("/api", bookRoutes);
// fot test purpose
app.get("/", (req, res) => {
  res.send("Test this world");
});

app.listen(8080, () => {
  console.log("App is listening at 8080");
});
