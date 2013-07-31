
/*
 * GET blog page.
 */

var Post = require('../models').Post
  , PostDao = require('../dao').PostDao;

exports.index = function(req, res){
  res.location = 'home';
  res.render('index');
};

// 
exports.posts = function(req, res, next) {
  var url = req.path.replace('/', '');
  console.log(url);
  PostDao.findOne({url: url}, function (err, post) {
    if (post) {
      res.render('post', post);
    } else {
      next();
    }
  });
}