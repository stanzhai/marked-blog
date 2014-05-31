
/**
 * marked-blog staticr based on koa.
 */
var path = require('path')
  , logger = require('koa-logger')
  , static = require('koa-static')
  , koa = require('koa')
  , routes = require('./routes')
  , blog = require('./routes/blog')
  , config = require('./config')
  , app = koa();

app.use(logger());

var publicFolder = path.join(__dirname, 'themes', config.theme, 'public');
var uploadFolder = path.join(__dirname, 'uploads');
app.use(static(publicFolder));
app.use(static(uploadFolder));
// blog page routes
routes(app);
// post page routes
app.use(blog.posts);

var port = process.env.PORT || config.port;
app.listen(port);
console.log('marked blog start listening on port %d', port);