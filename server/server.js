require("dotenv").config();
var fs = require("fs");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

// Route imports
var indexRoutes = require("./routes/index");
var userRoutes = require("./routes/userRoutes");
var todoListRoutes = require("./routes/todoListRoutes");

// Mongoose connection with mongodb
mongoose.Promise = require("bluebird");
mongoose
    .connect(
        "mongodb://" +
            process.env.mongodb_username +
            ":" +
            process.env.mongodb_password +
            "@ds155634.mlab.com:55634/todolistdb"
    )
    .then(() => {
        console.log("Start");
    })
    .catch(err => {
        console.error("App starting error:", err.stack);
        process.exit(1);
    });

var app = express();

// View engine
app.set("view engine", "html");
app.engine("html", function (path, options, callback) {
    fs.readFile(path, "utf-8", callback);
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/todoList", todoListRoutes);

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;
