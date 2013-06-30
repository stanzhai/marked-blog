
module.exports = function (req, res, next) {
  // 判断用户是否登录，如果登录会设置req.user对象
  if (!req.session.user) {
    // 如果为Ajax请求，返回错误信息
    if (req.xhr) {
      res.status(500).send({msg: '该操作需要认证，请登录后重试'});
    } else {
      res.redirect('/login?redirect=' + req.path);
    }
  } else {
    next();
  }
};
