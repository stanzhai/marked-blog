
/*
 * Login logic
 */
var config = require('../../config.yml');

// get login page
exports.get = function(req, res){
  res.render('login');
};

// post login data
exports.post = function(req, res) {
  var user = req.body.user;
  var password = req.body.password;
  var redirect = req.query.redirect;
  // username and password stored in config.yml
  if (user == config.admin_user && password == config.admin_password) {
    req.session.user = user;
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.redirect(config.admin_url);
    } 
  } else {
    res.render('login', {msg: '用户名或密码错误!'});
  }

};

// logout
exports.out = function (req, res) {
  delete req.session.user;
  res.redirect('/');
}