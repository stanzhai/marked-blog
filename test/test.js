var md = require('../utils/markdown')
  , fs = require('fs');

fs.readFile(__dirname + '/test.md', { encoding: 'utf8' }, function (err, data) {
  fs.writeFile(__dirname + '/test.html', md(String(data)));
});