
/**
 * marked-blog server based on koa.
 */
var logger = require('koa-logger')
  , route = require('koa-route')
  , parse = require('co-body')
  , koa = require('koa')
  , routes = require('./routes')
  , blog = require('./routes/blog')
  , config = require('./config')
  , app = koa();

app.use(logger());
// blog page routes
routes(app);
// post page routes
app.use(blog.posts);

var port = process.env.PORT || config.port;
app.listen(port);
console.log('marked blog start listening on port %d', port);