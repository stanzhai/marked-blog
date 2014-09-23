/**
 * 路由控制模块
 * Author: zhaishidan
 * Date: 2014-9-19
 */
var fs = require('fs')
  , autoMapRoutes = require('../lib/mapRoutes')
  , PostDao = require('../lib/dao').PostDao;

module.exports = function(app) {
  autoMapRoutes(app, __dirname);
  mapPostUrls(app);
};

function mapPostUrls (app) {
  app.use(function *(next) {
    var url = this.path.replace('/', '');
    url = decodeURI(url);
    var post = yield PostDao.findOne({url: url, public: true});
    if (post) {
      // add view count
      PostDao.update({url: url}, {views: post.views + 1});
      // set the prev and next post
      yield this.render('post', post);
    }
    yield next;
  });
}