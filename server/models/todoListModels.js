var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define collection and schema for Items
var todoLists = new Schema(
    {
        id: { type: String, unique: true, required: true },
        listItems: { type: Array }
    },
    {
        collection: "todoLists"
    }
);

module.exports = mongoose.model("TodoLists", todoLists);
