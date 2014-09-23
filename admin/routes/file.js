
/*
 * File Logic
 */
var fs = require('fs')
  , path = require('path');

exports.upload = function (req, res) {
  var file = req.files.upload;
  var src = file.path;
  var name = file.name;
  var des = path.join(__dirname, '../../uploads/' + name);
  fs.rename(src, des, function (err) {
    if (err) {
      // 
    }
  });
  // call callback function
  res.set('Content-Type', '');
  res.send("<script type=\"text/javascript\">parent.fileUploaded('" + name + "')</script>");
};
