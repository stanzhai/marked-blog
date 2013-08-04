
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
    res.render('post', { posts: data });
  });
};

// get post create or edit page
exports.createOrEdit = function(req, res) {
  var id = req.params.id;
  var emptyPost = {_id: '', url: '', title: '', content: ''};
  if (id) {
    PostDao.findOne({_id: id}, function (err, post) {
      if (post) {
        res.render('post_edit', {post: post});
      } else {
        res.render('post_edit', {post: emptyPost});
      }
    });
  } else {
    res.render('post_edit', {post: emptyPost});
  }
};

// add post
exports.create = function(req, res) {
  var post = new Post(req.body);
  post.url = post.url || post.title;

  PostDao.create(post, function (result) {
    res.send(result);
  });
};

// edit post 
exports.edit = function (req, res) {
  var newPost = req.body;

  PostDao.count({name: newPost.name, _id: { $ne: newPost._id }}, function (err, data) {
    if (data > 0) {
      res.status(500).send({msg: res.__('cateDuplicate') + newPost.name });
    } else {
      PostDao.update({ _id: newPost._id }, 
        {$set: {name: newPost.name, description: newPost.description }}, 
        false, 
        function (err) {
          if (err) {
            res.status(500).send({ msg: err });
          } else {
            res.send('ok');
          }
      });
    }
  });

}

exports.delete = function (req, res) {
  PostDao.delete({_id: req.body._id}, function (err) {
    res.send('ok');
  });
}