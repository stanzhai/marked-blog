/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var User = new Schema({
    name: String
  , uid: {type: String, unique: true}
  , email: String
  , t_url: String
  , profile_image_url: String
  , info: {type: {}}
  , metaweblog: {type: {}, default: Object}
  , setting: {type: {}, default: Object}
  , is_admin: {type: Boolean, default: false}
  , create_at: {type: Date, default: Date.now}
  , update_at: {type: Date, default: Date.now}
});
mongoose.model('User', User);