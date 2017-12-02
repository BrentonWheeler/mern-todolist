var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Todolist collection and schema
var todoLists = new Schema(
    {
        id: { type: String, unique: true, required: true },
        title: { type: String, required: true },
        listItems: { type: Array },
        githubUpdateURL: { type: String, default: null }
    },
    {
        collection: "todoLists"
    }
);

module.exports = mongoose.model("TodoLists", todoLists);
