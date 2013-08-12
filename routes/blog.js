
/*
 * GET blog page.
 */

var Post = require('../models').Post
  , PostDao = require('../dao').PostDao
  , config = require('../config.yml');

exports.index = function(req, res){
  var page_index = parseInt(req.params.page_index || '1');
  var keywords = req.query.search || '';
  keywords = decodeURI(keywords);

  // search conditions
  var search = {public: true};
  if (keywords != '') {
    title = '搜索：' + keywords;
    eval('var reg = /.*' + keywords + '.*/');
    search.$or = [{title: reg}, {abstract: reg}];
  }

  PostDao.count(search, function (err, count) {
    if (err) {

    } else {
      var page_size = config.per_page;
      // total post list page count
      var pages = count / page_size + count % page_size;
      // limit fields return
      var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1, abstract: 1};
      // search options
      var opt = {sort: {create_at: -1}, skip: (page_index - 1) * page_size, limit: page_size};

      PostDao.find(search, fields, opt, function (err, data) {
        if (err) {
          // error 

        } else {
          var indexTitle = page_index == 1 ? '首页' : '';
          var preTitle = keywords != '' ? '搜索:' + keywords : indexTitle;
          var title = page_index == 1 ? preTitle : preTitle + '第 ' + page_index + ' 页';

          var render_data = { posts: data, title: title, current_page: page_index, total_page: pages};
          res.render('index', render_data); 
        }
      });

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