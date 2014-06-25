/**
 * Admin Module dependencies.
 */

/*
var koa = require('koa')
  , config = require('../../config')
  , path = require('path')
  , i18n = require('i18n')
  , static = require('koa-static')
  , route = require('koa-route')
  , routes = require('./routes');

var app = koa();

// Internationalization
i18n.configure({
  locales: ['zh', 'en'], 
  cookie: 'locale', 
  defaultLocale: 'en',
  updateFiles: false,
  directory: __dirname + '/locales'
});

app.use(static(path.join(__dirname, '/public')));

routes(app);

module.exports = function (parent) {
  parent.use(route.get('/', app));
};
*/
module.exports = require('./routes');
