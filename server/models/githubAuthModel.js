var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TrelloAuth collection and schema
var githubAuth = new Schema(
    {
        cookieKey: { type: String, unique: true, required: true },
        token: { type: String, required: true }
    },
    {
        collection: "githubAuth"
    }
);

module.exports = mongoose.model("GitHub", githubAuth);
