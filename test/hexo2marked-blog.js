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
    var content = new String(data).replace(/^-{3}/, '').split('---');
    var result = yaml.parse(content.shift());
    result.content = content.join('---');
    result.url = moment(result.publish).format('YYYY/MM/DD/') + files[i].split('.')[0];
    result.create_at = result.date;

    var post = new Post(result);
    // extract abstract
    if (!post.abstract) {
      var regex = /<!--\s*more\s*-->/;
      var index = post.content.search(regex);
      if (index != -1) {
        post.abstract = post.content.substring(0, index);
      }
    }

    PostDao.create(post);

    console.log(post.url + ' --> saved!');
  };
  console.log('ok');
})
