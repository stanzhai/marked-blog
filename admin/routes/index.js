
/*
 * GET home page.
 */
var auth = require('../../utils/auth')
  , login = require('./login')
  , blog = require('./blog');

module.exports = function(app) {
  app.get('/login', login.get);
  app.post('/login', login.post);
  app.get('/logout', login.out);
  app.get('/admin', auth, blog.index);
};