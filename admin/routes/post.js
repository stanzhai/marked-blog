
/*
 * Post Logic
 */
var yaml = require('yamljs')
  , config = require('../../config.yml')
  , Post = require('../../models').Post
  , PostDao = require('../../dao').PostDao;

// get post index page
exports.index = function(req, res){
  res.render('post');
};

// get post list info
exports.list = function(req, res){
  PostDao.find({}, {title: 1, url: 1, create_at: 1, public: 1, views: 1}, {}, function (err, data) {
    res.render('postList', { posts: data });
  });
};


// add post
exports.create = function(req, res) {
  var post = new Post(req.body);
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