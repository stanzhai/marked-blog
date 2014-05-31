
/*
 * GET blog page.
 */
var path = require('path')
  , views = require('../lib/render')
  , Post = require('../lib/models').Post
  , PostDao = require('../lib/dao').PostDao
  , config = require('../config');

var viewFolder = path.join(__dirname, '../themes', config.theme, 'views');
var render = views(viewFolder);

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
  var totalCount = yield PostDao.count(search);

  // limit fields return
  var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1, abstract: 1};
  // search options
  var opt = {sort: {create_at: -1}, skip: (page_index - 1) * page_size, limit: page_size};
  var posts = yield PostDao.find(search, fields, opt);

  // total post list page count
  var pages = totalCount / page_size + totalCount % page_size;

  var indexTitle = page_index == 1 ? '首页' : '';
  var preTitle = keywords != '' ? '搜索:' + keywords : indexTitle;
  var title = page_index == 1 ? preTitle : preTitle + '第 ' + page_index + ' 页';

  var render_data = { posts: posts, title: title, current_page: page_index, total_page: pages};
  this.body = yield render('index', render_data); 
};

// get post by url
exports.posts = function *(next) {
  var url = this.path.replace('/', '');
  url = decodeURI(url);
  var post = yield PostDao.findOne({url: url, public: true});
  if (post) {
    var fields = {url: 1, title: 1};
    // search options
    var opt = {sort: {create_at: -1}, limit: 1};
    var search = {public: true, create_at: {$gt: post.create_at}};
    post.prev = yield PostDao.find(search, fields, opt);
    search = {public: true, create_at: {$lt: post.create_at}};
    post.next = yield PostDao.find(search, fields, opt);
    // add view count
    PostDao.update({url: url}, {views: post.views + 1});
    // set the prev and next post
    this.body = yield render('post', post);
  }
  yield next;
}