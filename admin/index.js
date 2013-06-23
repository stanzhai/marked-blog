
/**
 * Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , routes = require('./routes');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/admin', require('stylus').middleware(__dirname + '/public'));
app.use('/admin', express.static(path.join(__dirname, '/public')));

routes(app);

module.exports = function (parent, options) {
  parent.use(app);
};