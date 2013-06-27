
/*
 * Login logic
 */
var yaml = require('yamljs')
  , config = require('../../config.yml');

// get login page
exports.get = function(req, res){
  res.render('login');
};

// post login data
exports.post = function(req, res) {
  var user = req.body.user;
  var password = req.body.password;
  var redirect = req.query.redirect;
  // TODO: validate user
  req.session.user = user;
  if (redirect) {
    res.redirect(redirect);
  } else {
    res.redirect(config.admin_url);
  }
};

// logout
exports.out = function (req, res) {
  delete req.session.user;
  res.redirect('/');
}