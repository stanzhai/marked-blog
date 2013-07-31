var yaml = require('yamljs')
  , mongoose = require('mongoose')
  , moment = require('moment')
  , fs = require('fs')
  , path = require('path')
  , Post = require('../models').Post
  , PostDao = require('../dao').PostDao;

//var postsDir = 'D:\\Software\\cygwin\\home\\zhaishidan\\git\\hexoblog\\source\\_posts';
var postsDir = '/Users/stan/Documents/hexoblog/source/_posts';

fs.readdir(postsDir, function (err, files) {

  for (var i = 0; i < files.length; i++) {
    if (files[i][0] == '.') {
      continue;
    }
    var fullFile = path.join(postsDir, files[i]);

    var data = fs.readFileSync(fullFile);
    //console.log(new String(data));
    var content = new String(data).replace(/^-{3}/, '').split('---');
    var result = yaml.parse(content.shift());
    result.content = content.join('---');
    result.url = files[i].split('.')[0];
    result.create_at = result.date;

    var post = new Post(result);
    PostDao.create(post);
  };
  console.log('ok');
})