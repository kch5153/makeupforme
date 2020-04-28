// init project
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const config = require("./config/database");
const passport = require("passport");

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;
mongoose.connect(mongoDB, { useNewUrlParser: true, retryWrites: true });

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("cookie-parser")());

// PASSPORT/SESSION stuff
// configure passport
require('./config/passport')();

// add middleware 
/*
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
*/

app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


// set the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

// Load routes
const lookRouter = require("./routes/lookApi");
const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profileApi");
const myProfileRouter = require("./routes/myProfile");
const feedRouter = require("./routes/feed");
const searchRouter = require("./routes/search");
const otherProfileRouter = require("./routes/otherProfile");

app.use("/", indexRouter);
app.use("/look", lookRouter);
app.use("/profile", profileRouter);
app.use("/myProfile", myProfileRouter);
app.use("/feed", feedRouter);
app.use("/search", searchRouter);
app.use("/otherProfile", otherProfileRouter);

app.use(function (req, res, next) {
  res.status(404).send("404 Error: Page Not Found =[")
})


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
