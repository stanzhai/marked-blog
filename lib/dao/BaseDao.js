/**
 * Data access functions based on mongoose
 */
 
function BaseDao (Model){
  this.model = Model;
}

BaseDao.prototype.create = function (doc){
  var self = this;
  return function (fn) {
    self.model.save(doc, fn);
  }
  /*
  model.create(doc, function (error) {
    if(error) return callback(error);
    model.findOne(doc, function (error, data) {
      if (error) return callback(error);
      return callback(data);
    })
  });
*/
};

BaseDao.prototype.getById = function (id) {
  var self = this;
  return function (fn) {
    self.model.findOne({_id: id}, fn);
  };
};

BaseDao.prototype.count = function (query) {
  var self = this;
  return function (fn) {
    self.model.count(query, fn);
  };
};

BaseDao.prototype.findOne = function (query) {
  var self = this;
  return function (fn) {
    self.model.findOne(query, fn);
  };
};

BaseDao.prototype.find = function (query,fileds,opt) {
  var self = this;
  return function (fn) {
    self.model.find(query, fileds, opt, fn);
  };
};


BaseDao.prototype.getAll = function () {
  var self = this;
  return function (fn) {
    self.find({}, fn);
  };
};

BaseDao.prototype.delete = function (query){
  var self = this;
  return function (fn) {
    self.model.remove(query, fn);
  };
};

BaseDao.prototype.update = function( conditions, update ,options, callback) {
  var self = this;
  return function (fn) {
    self.model.update(conditions, update, options, fn);
  };
};

module.exports = BaseDao;