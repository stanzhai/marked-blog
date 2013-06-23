var models = require('../models')
  , BaseDao = require('./BaseDao');

for (var modelName in models) {
  exports[modelName + 'Dao'] = new BaseDao(models[modelName]);
}

