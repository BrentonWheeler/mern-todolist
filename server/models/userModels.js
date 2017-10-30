var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Users collection and schema
var user = new Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true }
    },
    {
        collection: "users"
    }
);

module.exports = mongoose.model("User", user);
