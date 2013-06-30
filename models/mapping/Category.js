/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var Category = new Schema({
    name: {type: String, index: true}
  , description: {type: String}
  , posts_id: [ObjectId]
});

mongoose.model('Category', Category);