
/*
 * GET blog page.
 */
var async = require('async')
  , render = require('../lib/render')
  , Post = require('../lib/models').Post
  , PostDao = require('../lib/dao').PostDao
  , config = require('../config');

exports.index = function *(page_index){
  var page_index = parseInt(page_index || '1');
  var keywords = this.query.search || '';
  keywords = decodeURI(keywords);

  // search conditions
  var search = {public: true};
  if (keywords != '') {
    eval('var reg = /.*' + keywords + '.*/');
    search.$or = [{title: reg}, {abstract: reg}];
  }

  // post count of per page
  var page_size = config.per_page;

  var results = yield function (fn) {
    async.parallel({
      count: function (callback) {
        // get all public post count
        PostDao.count(search, function (err, count) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, count);
          }
        });
      },
      posts: function (callback) {
        // limit fields return
        var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1, abstract: 1};
        // search options
        var opt = {sort: {create_at: -1}, skip: (page_index - 1) * page_size, limit: page_size};
        PostDao.find(search, fields, opt, function (err, data) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, data);
          }
        });
      }
    }, fn);
  };

  // total post list page count
  var pages = results.count / page_size + results.count % page_size;

  var indexTitle = page_index == 1 ? '首页' : '';
  var preTitle = keywords != '' ? '搜索:' + keywords : indexTitle;
  var title = page_index == 1 ? preTitle : preTitle + '第 ' + page_index + ' 页';

  var render_data = { posts: results.posts, title: title, current_page: page_index, total_page: pages};
  this.body = yield render('list', render_data); 
};

// get post by url
exports.posts = function *(next) {
  var url = this.path.replace('/', '');
  url = decodeURI(url);
  var post = yield function (fn) {
    PostDao.findOne({url: url, public: true}, fn);
  };
  if (post) {
    var results = yield function (fn) {
      var fields = {url: 1, title: 1};
      // search options
      var opt = {sort: {create_at: -1}, limit: 1};
      // get prev and next post
      async.parallel({
        prev: function (callback) {
          var search = {public: true, create_at: {$gt: post.create_at}};
          PostDao.find(search, fields, opt, function (err, data) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, data[0]);
            }
          });
        },
        next: function (callback) {
          var search = {public: true, create_at: {$lt: post.create_at}};
          PostDao.find(search, fields, opt, function (err, data) {
            if (err) {
              callback(err, null);
            } else {
              callback(null, data[0]);
            }
          });
        }
      },fn);
    };
    // add view count
    PostDao.update({url: url}, {views: post.views + 1});
    // set the prev and next post
    post.prev = results.prev;
    post.next = results.next;
    this.body = yield render('post', post);
  }
  yield next;
}