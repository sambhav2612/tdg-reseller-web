var path = require('path'),
    projectPath = path.normalize(__dirname + '/..');

module.exports={
  root : require('path').normalize(__dirname + '/..'),
  app: {
    name: 'tdg-web'
  },
  api : {
    url : ""
  },
  web :{
    url : '',
    css : 'http://',
    js : 'http://'
  },
  oAuth : {
  },
  analytics : false,
  logs : {
    accessLogFile: path.resolve(projectPath, '../logs/access.log'),
    applicationLogFile: path.resolve(projectPath, '../logs/tdg-web.log'),
    databaseLogFile: path.resolve(projectPath, '../logs/tdg-web.log'),
    level: "info",
    maxsize: 20971520
  },


  port:3000
}