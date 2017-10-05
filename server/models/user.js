var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var user = new Schema({
  username: { type : String , unique : true, required : true, dropDups: true },
  password: { type : String , required : true},
},{
    collection: 'users'
});

module.exports = mongoose.model('User', user);
