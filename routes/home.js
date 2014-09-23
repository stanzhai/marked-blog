/*
 * GET blog page.
 */
var path = require('path')
  , Post = require('../lib/models').Post
  , PostDao = require('../lib/dao').PostDao
  , config = require('../config');

function* index(pageIndex) {
  var pageIndex = this.params.pageIndex;
  pageIndex = typeof(pageIndex) == 'string' ? parseInt(pageIndex) : 1;
  if (pageIndex < 1) {
    pageIndex = 1;
  }
  var keywords = this.query.search || '';
  keywords = decodeURI(keywords);

  // search conditions
  var search = {public: true};
  if (keywords) {
    eval('var reg = /.*' + keywords + '.*/');
    search.$or = [{title: reg}, {abstract: reg}];
  }

  // post count of per page
  var pageSize = config.perPage;
  var totalCount = yield PostDao.count(search);

  // limit fields return
  var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1, abstract: 1};
  // search options
  var opt = {sort: {create_at: -1}, skip: (pageIndex - 1) * pageSize, limit: pageSize};
  var posts = yield PostDao.find(search, fields, opt);

  // total post list page count
  var pages = Math.ceil(totalCount / pageSize);
  if (pageIndex > pages) {
    pageIndex = pages;
  }

  var indexTitle = pageIndex == 1 ? '首页' : '';
  var preTitle = keywords != '' ? '搜索:' + keywords : indexTitle;
  var title = pageIndex == 1 ? preTitle : preTitle + '第 ' + pageIndex + ' 页';
  if (pageIndex <= 1) {
    title = null;
  }

  var renderData = { posts: posts, title: title, currentPage: pageIndex, totalPage: pages};
  yield this.render('index', renderData); 
};

/**
 * 站点主页的请求
 */
function Home () {}

Home.prototype.index = index;
Home.prototype.page_pageIndex = index;

module.exports = new Home();