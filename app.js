
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http') 
  , yaml = require('yamljs')
  , path = require('path')
  , admin = require('./admin')
  , routes = require('./routes')
  , blog = require('./routes/blog')
  , config = require('./config.yml')
  , Category = require('./models').Category
  , CategoryDao = require('./dao').CategoryDao;

// CategoryDao.create(new Category({name: 'zsd', description: 'jasondan325@163.com'}), function (doc) {
//   console.log(doc);
// });

var app = express();

var viewFolder = path.join(__dirname, '/themes/', config.theme, '/views');
var publicFolder = path.join(__dirname, '/themes/', config.theme, '/public');
var uploadFolder = path.join(__dirname, '/uploads');

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', viewFolder);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'marked-blog' }));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(publicFolder));
app.use(express.static(publicFolder));
app.use(express.static(uploadFolder));
app.use(app.router);
app.locals(config);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// admin page routes
admin(app);
// blog page routes
routes(app);
// post page routes
app.use(blog.posts);
// 404 status page
app.use(function (req, res) { 
  res.status(404);
  res.render('404', {title: '404 Error'}); 
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('marked-blog server listening on port ' + app.get('port'));
});
