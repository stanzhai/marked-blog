function BaseDao (Model){
  this.model = Model;
}

// create
BaseDao.prototype.create = function (doc, callback){
  var model = this.model;
  model.create(doc, function (error) {
    if(error) return callback(error);
    model.findOne(doc, function (error, data) {
      if (error) return callback(error);
      return callback(data);
    })
  });
};

BaseDao.prototype.getById = function (id, callback) {
  this.model.findOne({_id:id}, function(error, model){
    if(error) return callback(error,null);
    return callback(null,model);
  });
};

BaseDao.prototype.count = function (query, callback) {
  this.model.count(query, function(error, model){
    if(error) return callback(error,null);
    return callback(null,model);
  });
};

BaseDao.prototype.findOne = function (query, callback) {
  this.model.findOne(query, function(error, model){
    if(error) return callback(error,null);
    return callback(null,model);
  });
};

BaseDao.prototype.find = function (query,fileds,opt,callback) {
  this.model.find(query, fileds, opt, function(error,model){
    if(error) return callback(error,null);
    return callback(null,model);
  });
};


BaseDao.prototype.getAll = function (callback) {
  this.model.find({}, function(error,model){
    if(error) return callback(error,null);
    return callback(null, model);
  });
};

BaseDao.prototype.delete = function (query, callback){
  this.model.remove(query, function(error){
    if(error) return callback(error);
    return callback(null);
  });
};

BaseDao.prototype.update = function( conditions, update ,options, callback) {
  this.model.update(conditions, update, options, function (error) {
    if (typeof(callback) == 'undefined') return null;
    if(error) return callback(error);
    return callback(null);
  });
};

module.exports = BaseDao;