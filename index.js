
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http') 
  , yaml = require('yamljs')
  , path = require('path')
  , admin = require('./admin')
  , config = require('./config.yml')
  , User = require('./models').User
  , UserDao = require('./dao').UserDao;

UserDao.create(new User({uid: 'zsd', name: 'zsd', email: 'jasondan325@163.com'}), function (doc) {
  console.log(doc);
});

var app = express();

var viewFolder = path.join(__dirname, '/themes/', config.theme, '/views');
var publicFolder = path.join(__dirname, '/themes/', config.theme, '/public');

// all environments
app.set('port', process.env.PORT || config.port);
app.set('views', viewFolder);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(publicFolder));
app.use(express.static(publicFolder));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

admin(app);
routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
