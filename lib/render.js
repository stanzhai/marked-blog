
/**
 * Module dependencies.
 */

var views = require('co-views')
  , config = require('../config');


// setup views mapping .html
// to the swig template engine

module.exports = function (path) {
  var render = views(path, {
    map: { html: 'swig' }
  });

  return function (view, locals) {
    if (!locals) locals = {};
    // add site info
    locals.site_name = config.site_name;
    locals.sub_title = config.sub_title;
    locals.description = config.description;
    locals.author = config.author;
    locals.email = config.email;

    return render(view, locals);
  }
};
