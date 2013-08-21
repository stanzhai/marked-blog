
/*
 * Category Logic
 */
var config = require('../../config.yml')
  , Category = require('../../models').Category
  , CategoryDao = require('../../dao').CategoryDao;

// get category index page
exports.index = function(req, res){
  res.render('category', {title: res.__('category')});
};

// get category list info
exports.list = function(req, res){
  CategoryDao.getAll(function (err, data) {
    res.send(data);
  });
};

// add category
exports.create = function(req, res) {
  var category = new Category(req.body);

  CategoryDao.count({name: category.name}, function (err, data) {
    if (data > 0) {
      res.status(500).send({msg: res.__('cateDuplicate') + category.name });
    } else {
      CategoryDao.create(category, function (result) {
        res.send(result);
      });
    }
  });

};

// edit category 
exports.edit = function (req, res) {
  var newCategory = req.body;

  CategoryDao.count({name: newCategory.name, _id: { $ne: newCategory._id }}, function (err, data) {
    if (data > 0) {
      res.status(500).send({msg: res.__('cateDuplicate') + newCategory.name });
    } else {
      CategoryDao.update({ _id: newCategory._id }, 
        {$set: {name: newCategory.name, description: newCategory.description }}, 
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
  CategoryDao.delete({_id: req.body._id}, function (err) {
    res.send('ok');
  });
}