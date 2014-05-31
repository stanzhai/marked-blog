/**
 * site config 
 */
module.exports = {
  // Site Info
  site_name: 'StanZhai::Blog',
  sub_title: '好记性不如烂键盘！',
  description: '翟士丹的技术博客，爱编码，爱生活，有梦想，不抱怨。',
  author: 'StanZhai 翟士丹',
  email: 'stanzhai@outlook.com',
  language: 'zh-CN',

  // Server
  // Marked Blog uses Connect as a server
  // You can customize the logger format as defined in
  // http://www.senchalabs.org/connect/logger.html
  port: 4000,
  admin_url: '/admin',
  admin_user: 'admin',
  admin_password: 'admin',
  logger: false,
  logger_format: '',

  // Theme
  theme: 'simple',

  // Url
  url: 'http://blog.zhaishidan.cn',
  root: '/',
  permalink: ':year/:month/:day/:title/',

  // Pagination
  // Set per_page to 0 to disable pagination
  per_page: 10,

  // Database
  // Marked Blog uses MongoDB as database server
  // For Dev: mongodb://<user>:<password>@widmore.mongohq.com:10010/marked-blog
  // For Dev2: mongodb://<dbuser>:<dbpassword>@ds027748.mongolab.com:27748/marked-blog
  mongodb: {
    host: 'localhost',
    port: 27017,
    db_name: 'marked-blog',
    user_name: '',
    password: '',
  }

}