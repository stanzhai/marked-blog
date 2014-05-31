var models = require('../models')
  , BaseDao = require('./BaseDao');

// generate model dao object
for (var modelName in models) {
  exports[modelName + 'Dao'] = new BaseDao(models[modelName]);
}

