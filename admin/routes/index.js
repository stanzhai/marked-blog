/*
 * admin pages.
 */
var auth = require('../../utils/auth')
  , yaml = require('yamljs')
  , config = require('../../config.yml')
  , login = require('./login')
  , admin = require('./admin')
  , category = require('./category')
  , post = require('./post');

module.exports = function(app) {
  app.get('/login', login.get);
  app.post('/login', login.post);
  app.get('/logout', login.out);

  // All of the following request requires authentication
  app.all(config.admin_url + '/*', auth);

  app.get('/', admin.index);
  // category
  app.get('/category', category.index);
  app.get('/categoryList', category.list);
  app.post('/category', category.create);
  app.put('/category', category.edit);
  app.delete('/category', category.delete);
  // post
  app.get('/post', post.index);
  app.get('/postList', post.list);
  app.post('/post', post.create);
  app.put('/post', post.edit);
  app.delete('/post', post.delete);
};