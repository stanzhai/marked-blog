
/*
 * GET home page.
 */
var blog = require('./blog');

module.exports = function(app) {
  app.get('/', blog.index);
  app.get('/page/:page_index', blog.index);
};