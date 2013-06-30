
/*
 * Login logic
 */
var yaml = require('yamljs')
  , config = require('../../config.yml')
  , Category = require('../../models').Category
  , CategoryDao = require('../../dao').CategoryDao;

// get category index page
exports.index = function(req, res){
  res.render('category');
};

// get category list info
exports.list = function(req, res){
  CategoryDao.getAll(function (err, data) {
    res.send(data);
  })
};


// add category
exports.create = function(req, res) {
  var category = new Category(req.body);
  CategoryDao.create(category, function (result) {
    console.log(result);
    res.send(result);
  })
};

// edit category 
exports.edit = function (req, res) {
  var newCategory = req.body;
  CategoryDao.update({ _id: newCategory._id }, 
    {$set: {name: newCategory.name, description: newCategory.description }}, 
    false, 
    function (err) {
      res.send('ok');
  });
}

exports.delete = function (req, res) {
  CategoryDao.delete({_id: req.body._id}, function (err) {
    res.send('ok');
  });
}