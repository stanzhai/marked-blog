
/*
 * GET blog page.
 */

var moment = require('moment')
  , Post = require('../models').Post
  , PostDao = require('../dao').PostDao;

exports.index = function(req, res){
  var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1};
  PostDao.find({public: true}, fields, {sort: {create_at: -1}}, function (err, data) {
    for (var i = 0; i < data.length; i++) {
      var post = data[i];
      var date = moment(post.create_at).format('YYYY-MM-DD');
      post.create_date = date;
    };
    res.render('index', { posts: data });
  });
};

// get post by url
exports.posts = function(req, res, next) {
  var url = req.path.replace('/', '');
  url = decodeURI(url);
  PostDao.findOne({url: url}, function (err, post) {
    if (post) {
      // add view count
      PostDao.update({url: url}, {views: post.views + 1});
      res.render('post', post);
    } else {
      next();
    }
  });
}