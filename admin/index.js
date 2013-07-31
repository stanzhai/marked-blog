/**
 * Admin Module dependencies.
 */

var express = require('express')
  , path = require('path')
  , i18n = require('i18n')
  , routes = require('./routes');

var app = express();

// Internationalization
i18n.configure({
  locales: ['zh', 'en'], 
  cookie: 'locale', 
  defaultLocale: 'en',
  updateFiles: false,
  directory: __dirname + '/locales'
});

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(i18n.init);
app.use('admin', require('stylus').middleware(__dirname + '/public'));
app.use('admin', express.static(path.join(__dirname, '/public')));

routes(app);

module.exports = function (adminUrl, parent) {
  parent.use(adminUrl, app);
};