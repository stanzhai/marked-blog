/*
 * admin pages.
 */
var auth = require('../../utils/auth')
  , login = require('./login')
  , admin = require('./admin')
  , category = require('./category')
  , post = require('./post');

module.exports = function(app) {
  var config = app.get('config');

  app.get('/login', login.get);
  app.post('/login', login.post);
  app.get('/logout', login.out);

  console.log(config.admin_url);
  // All of the following request requires authentication
  //app.all('*', auth);

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