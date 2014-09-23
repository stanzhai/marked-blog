/**
 * 路由控制模块
 * 将对象的函数自动映射为路由：
 * Router.prototype.index -> get:/router/index or get:/router
 * Router.prototype.post_index -> post:/router/index
 * Router.prototype.put_index -> put:/router/index
 * Router.prototype.delete_index -> delete:/router/index
 * Router.prototype.index_param -> get:/router/index/:param
 * Author: zhaishidan
 * Date: 2014-9-19
 */
var fs = require('fs');

module.exports = function (app, routePath) {
  // automaticly mapping routes
  fs.readdirSync(routePath).forEach(function (file) {

    if (file == 'index.js') {
      return;
    }

    var methods = ['get', 'post', 'put', 'delete'];

    var routeObj = require(routePath + '/' + file);
    var routeName = '/' + routeObj.constructor.name.toLowerCase() + '/';
    for (var key in routeObj) {
      var urlInfo = key.split('_');
      // 从对象的key中获取url映射信息，和http method信息，并自动填充到app中
      // /opinion/XXX，的形式
      var methodIndex = 0;
      var method = '';
      var action = '';
      var param = '';
      if (urlInfo.length == 1) {
        method = methods[methodIndex];
        action = key;
      } else if (urlInfo.length == 2) {
        if (!urlInfo[0]) {
          continue;
        }
        methodIndex = methods.indexOf(urlInfo[0]);
        if (methodIndex == -1) {
          method = methods[0];
          action = urlInfo[0];
          param = ':' + urlInfo[1];
        } else {
          method = urlInfo[0];
          action = urlInfo[1];
        }
      } else if (urlInfo.length == 3) {
        method = urlInfo[0];
        action = urlInfo[1];
        param = ':' + urlInfo[2];
      }
      if (action == 'index') {
        if (routeName == '/home/') {
          app[method]('/' + param, routeObj[key]);
        } else {
          app[method](routeName + param, routeObj[key]);
        }
      }
      app[method](routeName + action + '/' + param, routeObj[key]);
      console.log('auto map route -> [%s]%s%s/%s', method, routeName, action, param);
    }
  });
}