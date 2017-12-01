var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TrelloAuth collection and schema
var githubAuth = new Schema(
    {
        githubId: { type: String, required: true }
    },
    {
        collection: "githubAuth"
    }
);

module.exports = mongoose.model("GitHub", githubAuth);
