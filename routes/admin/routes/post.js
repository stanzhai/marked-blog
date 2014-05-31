
/*
 * Post Logic
 */
var yaml = require('yamljs')
  , moment = require('moment')
  , config = require('../../config.yml')
  , Post = require('../../models').Post
  , PostDao = require('../../dao').PostDao;

// get post list page
exports.index = function(req, res) {
  var fields = {title: 1, url: 1, create_at: 1, public: 1, views: 1};
  var opts = {sort: {create_at: -1}};

  PostDao.find({}, fields, opts, function (err, data) {
    for (var i = 0; i < data.length; i++) {
      var post = data[i];
      var date = moment(post.create_at).format('YYYY-MM-DD HH:mm:ss');
      post.create_date = date;
    };
    res.render('post', { posts: data, title: res.__('posts') });
  });
};

// get post create or edit page
exports.createOrEdit = function(req, res) {
  var id = req.params.id;
  var emptyPost = {_id: '', url: '', title: '', content: ''};
  // response data
  var resData = {post: emptyPost, title: res.__('editPost')};
  if (id) {
    PostDao.findOne({_id: id}, function (err, post) {
      if (post) {
        resData.post = post;
        res.render('post_edit', resData);
      } else {
        res.render('post_edit', resData);
      }
    });
  } else {
    res.render('post_edit', resData);
  }
};

// add post
exports.create = function(req, res) {
  var post = new Post(req.body);
  post.title = post.title || 'Untitled' + moment(new Date()).format('YYYY-MM-DD_HH:mm:ss');;
  post.url = post.url || post.title;
  // extract abstract
  if (!post.abstract) {
    var regex = /<!--\s*more\s*-->/;
    var index = post.content.search(regex);
    if (index != -1) {
      post.abstract = post.content.substring(0, index);
    }
  }

  PostDao.create(post, function (result) {
    res.send(result);
  });
};

// edit post 
exports.edit = function (req, res) {

  var post = req.body;
  post.title = post.title || 'Untitled' + moment(new Date()).format('YYYY-MM-DD_HH:mm:ss');;

  PostDao.update({ _id: post._id }, 
    {$set: {title: post.title, content: post.content }}, 
    false, 
    function (err) {
      if (err) {
        res.status(500).send({ msg: err });
      } else {
        res.send('ok');
      }
  });
}

exports.delete = function (req, res) {
  PostDao.delete({_id: req.body._id}, function (err) {
    res.send('ok');
  });
}