// PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://Brenton:password420@ds155634.mlab.com:55634/todolistdb')
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// IMPORTS //
var indexRoutes = require('./routes/index')
var userRoutes = require('./routes/userRoutes');

// CREATE APP //
var app = express();

// VIEW ENGINE //
app.set('view engine', 'html');
app.engine('html', function(path, options, callbacks){
  fs.readFile(path, 'utf-8', callback);
});

// MIDDLEWARE //
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

// ROUTES //
app.use('/', indexRoutes);
app.use('/users', userRoutes);

// ERROR HANDLER //
app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

module.exports = app;
