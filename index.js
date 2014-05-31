
/**
 * Module dependencies.
 */
var logger = require('koa-logger')
  , route = require('koa-route')
  , parse = require('co-body')
  , koa = require('koa')
  , routes = require('./routes')
  , blog = require('./routes/blog')
  , app = koa();

app.use(logger());
// blog page routes
routes(app);
// post page routes
app.use(blog.posts);

app.listen(3000);
console.log('listening on port 3000');