var hljs = require('highlight.js')
  , marked = require('marked')
  , _ = require('lodash');

var alias = {
  js: 'javascript',
  jscript: 'javascript',
  html: 'xml',
  htm: 'xml',
  coffee: 'coffeescript',
  'coffee-script': 'coffeescript',
  yml: 'yaml',
  pl: 'perl',
  ru: 'ruby',
  rb: 'ruby'
};

var keys = Object.keys(alias);

var highlight = function(raw, options){
  // highlight默认配置
  var defaults = {
    gutter: true,
    first_line: 1,
    lang: '',
    caption: '',
    tab: ''
  };

  var options = _.extend(defaults, options);

  if (options.tab){
    raw = raw.replace(/\n(\t+)/g, function(match, tabs){
      var result = '\n';

      for (var i=0, len=tabs.length; i<len; i++){
        result += options.tab;
      }

      return result;
    });
  }

  var result = '';
  if (!options.lang){
    result = hljs.highlightAuto(raw).value;
  } else if (options.lang === 'plain'){
    result = raw;
  } else {
    var lang = options.lang.toLowerCase();

    if (keys.indexOf(lang) !== -1) lang = alias[lang];

    try {
      result = hljs.highlight(lang, raw).value;
    } catch (e){
      result = hljs.highlightAuto(raw).value;
    }
  }
  
  return result;
};

// markdown默认配置
var defaults = {
  gfm: true,
  pedantic: false,
  sanitize: false,
  // 使用higlight处理代码块
  highlight: function(code, lang){
    return highlight(code, {lang: lang});
  }
};

// 处理Markdown标签
module.exports = function(data, options){
  return marked(data, _.extend(defaults, options));
};
