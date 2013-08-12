
/*
 * GET blog page.
 */

var Post = require('../models').Post
  , PostDao = require('../dao').PostDao;

exports.index = function(req, res){
  var title = '首页';
  var page_index = req.params.page_index || 1;
  var keywords = req.query.search || '';
  keywords = decodeURI(keywords);

  // search conditions
  var search = {public: true};
  if (keywords != '') {
    title = '搜索：' + keywords;
    eval('var reg = /.*' + keywords + '.*/');
    search.$or = [{title: reg}, {abstract: reg}];
  }

  // limit fields return
  var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1, abstract: 1};
  // search options
  var opt = {sort: {create_at: -1}, skip: (page_index - 1) * 20, limit: 20};

  PostDao.find(search, fields, opt, function (err, data) {
    if (err) {
      // error 

    } else {
      res.render('index', { posts: data, title: title}); 
    }
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