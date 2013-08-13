/*
 * admin pages.
 */
var auth = require('../../utils/auth')
  , login = require('./login')
  , admin = require('./admin')
  , category = require('./category')
  , post = require('./post')
  , settings = require('./settings');

module.exports = function(app) {
  var config = app.get('config');

  app.get('/login', login.get);
  app.post('/login', login.post);
  app.get('/logout', login.out);

  // All of the following request requires authentication
  app.all('*', auth);

  app.get('/', post.index);
  // category
  app.get('/category', category.index);
  app.get('/categoryList', category.list);
  app.post('/category', category.create);
  app.put('/category', category.edit);
  app.delete('/category', category.delete);
  // post
  app.get('/post', post.index);
  app.get('/post/create', post.createOrEdit);
  app.get('/post/edit/:id', post.createOrEdit);
  app.post('/post', post.create);
  app.put('/post', post.edit);
  app.delete('/post', post.delete);
  // settings
  app.get('/settings', settings.get);
};