
/*
 * GET home page.
 */
var blog = require('./blog');

module.exports = function(app) {
  app.get('/admin', blog.index);
};