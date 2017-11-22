var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TrelloAuth collection and schema
var trelloAuth = new Schema(
    {
        cookieKey: { type: String, unique: true, required: true },
        token: { type: String, required: true },
        secret: { type: String, required: true }
    },
    {
        collection: "trelloAuth"
    }
);

module.exports = mongoose.model("Trello", trelloAuth);
