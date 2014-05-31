/**
 * Admin Module dependencies.
 */

var express = require('express')
  , yaml = require('yamljs') 
  , config = require('../config.yml')
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
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/public')));
app.locals(config);
app.set('config', config);

routes(app);

module.exports = function (parent) {
  parent.use(config.admin_url, app);
};