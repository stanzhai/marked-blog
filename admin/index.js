/**
 * Admin Module dependencies.
 */
var koa = require('koa')
  , config = require('../config')
  , path = require('path')
  , serve = require('koa-static')
  , router = require('koa-router')
  , render = require('koa-ejs')
  , gzip = require('koa-gzip');

var app = koa();

var ejsConfig = {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  locals: { 
    siteName: config.siteName, 
    subTitle: config.subTitle,
    author: config.author
  },
  debug: true
};
render(app, ejsConfig);

app.use(gzip());
app.use(serve(path.join(__dirname, '/public')));
app.use(router(app));
require('./routes')(app);

module.exports = app;
