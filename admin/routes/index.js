
/*
 * GET home page.
 */
var auth = require('../../utils/auth')
  , login = require('./login')
  , category = require('./category')
  , blog = require('./blog');

module.exports = function(app) {
  app.get('/login', login.get);
  app.post('/login', login.post);
  app.get('/logout', login.out);

  app.get('/admin', auth, blog.index);
  // category
  app.get('/category', auth, category.index);
  app.get('/categoryList', auth, category.list);
  app.post('/category', auth, category.create);
  app.put('/category', auth, category.edit);
  app.delete('/category', auth, category.delete);
};