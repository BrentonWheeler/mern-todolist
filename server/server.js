require("dotenv").config();
var fs = require("fs");
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

// Socket imports
var http = require("http");
var server = http.createServer();
var socket_io = require("socket.io");

// Websockets and redux
server.listen(4201);
var io = socket_io();
io.attach(server);
io.on("connection", function (socket) {
    console.log("Socket connected: " + socket.id);
    socket.on("action", action => {
        console.log("Got data: ", action);
        let newActionType = action.type.replace("server/", "");
        io.sockets.emit("action", { ...action, type: newActionType });
    });
});

// Route imports
var indexRoutes = require("./routes/index");
var userRoutes = require("./routes/userRoutes");
var todoListRoutes = require("./routes/todoListRoutes");
var trelloRoutes = require("./routes/trelloRoutes");

// Mongoose connection with mongodb
mongoose.Promise = require("bluebird");
mongoose
    .connect(process.env.MONGODB_URL)
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
app.use("/trello", trelloRoutes);

// Error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;
