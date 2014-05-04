var yaml = require('yamljs')
  , mongoose = require('mongoose')
  , moment = require('moment')
  , async = require('async')
  , fs = require('fs')
  , path = require('path')
  , Post = require('../models').Post
  , xmlrpc = require('xmlrpc');

//var postsDir = 'D:\\Software\\cygwin\\home\\zhaishidan\\git\\hexoblog\\source\\_posts';
var postsDir = '/Users/stan/Documents/hexoblog/source/_posts';
var client = xmlrpc.createClient({ host: 'www.cnblogs.com', port: 80, path: '/jasondan/services/metaweblog.aspx'})


fs.readdir(postsDir, function (err, files) {

  async.eachSeries(files, function (file, callback) {
    if (file[0] == '.') {
      callback();
      return;
    }
    console.log(file);

    var fullFile = path.join(postsDir, file);

    var data = fs.readFileSync(fullFile);
    var content = new String(data).replace(/^-{3}/, '').split('---');
    var result = yaml.parse(content.shift());
    result.content = content.join('---');
    result.create_at = result.date;

    var post = new Post(result);

    var cnblogs = {
      dateCreated: result.date,
      description: post.html.replace(/<img src="\//ig,"<img src=\"http://stanzhai.github.com/"),
      categories: post.categories,
      title: post.title
    }

    // Sends a method call to the XML-RPC server
    client.methodCall('metaWeblog.newPost', ['jasondan', 'stanzhai', 'zsd325', cnblogs, false], function (error, value) {
      // Results of the method response
      if (error) {
        console.log(error);
      } else {
        console.log('Method response for \'anAction\': ' + value);
      }
      callback();
    });

  }, function () {
    console.log('ok');
  });
  
})
