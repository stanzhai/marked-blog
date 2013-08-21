var xmlrpc = require('xmlrpc');

var client = xmlrpc.createClient({ host: 'www.cnblogs.com', port: 80, path: '/jasondan/services/metaweblog.aspx'})

var post = {
  dateCreated: new Date(),
  description: 'test description',
  title: 'title'
}

// Sends a method call to the XML-RPC server
client.methodCall('metaWeblog.newPost', ['jasondan', 'stanzhai', 'zsd325', post, true], function (error, value) {
  // Results of the method response
  console.log('Method response for \'anAction\': ' + value)
});