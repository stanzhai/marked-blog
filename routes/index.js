
/*
 * GET home page.
 */
var blog = require('./blog')
  , route = require('koa-route');

module.exports = function(app) {
  app.use(route.get('/', blog.index));
  app.use(route.get('/page/:page_index', blog.index));
};