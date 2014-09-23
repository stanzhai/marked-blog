/**
 * marked-blog server based on koa.
 */
var path = require('path')
  , koa = require('koa')
  , router = require('koa-router')
  , logger = require('koa-logger')
  , serve = require('koa-static')
  , render = require('koa-ejs')
  , gzip = require('koa-gzip')
  , mount = require('koa-mount')
  , routes = require('./routes')
  , admin = require('./admin')
  , config = require('./config')
  , app = koa();

var ejsConfig = {
  root: path.join(__dirname, 'themes', config.theme, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  locals: { 
    siteName: config.siteName, 
    subTitle: config.subTitle,
    author: config.author
  },
  debug: true
};
render(app, ejsConfig);

var publicFolder = path.join(__dirname, 'themes', config.theme, 'public');
var uploadFolder = path.join(__dirname, 'uploads');
var commonPublicFolder = path.join(__dirname, 'public');

app.use(logger());
app.use(gzip());
app.use(serve(uploadFolder));
app.use(serve(publicFolder));
app.use(serve(commonPublicFolder));
app.use(router(app));
app.use(mount(config.adminUrl, admin));
// blog page routes
require('./routes')(app);

var port = process.env.PORT || config.port;
app.listen(port);
console.log('marked blog start listening on port %d', port);