/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , fs = require('fs')
  , yaml = require('yamljs')
  , db = require('../config.yml').mongodb;

// build mongodb uri
var uri = 'mongodb://';
if(db.user_name && db.password) {
  uri += db.user_name + ':' + db.password + '@';
}
db.host = db.host || 'localhost';
uri += db.host;
if(db.port) {
  uri += ':' + db.port;
}
uri += '/' + db.db_name;

mongoose.connect(uri, function(err) {
  if(err) {
    console.error('Connect to ' + uri + ' error: ' + err.message);
    console.error(err);
    process.exit(1);
  } else {
    console.log('Connect to ' + uri + ' success.');
  }
});

// automaticly load data models
var models_path = __dirname + '/mapping'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('.js', '');
    exports[modelName] = mongoose.model(modelName);
});
