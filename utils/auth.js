
module.exports = function (req, res, next) {
  // 判断用户是否登录，如果登录会设置req.user对象
  if (!req.session.user) {
    res.redirect('/login?redirect=' + req.path);
  } else {
    next();
  }
};
