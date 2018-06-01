var winston = require('winston'),
    fs = require('fs'),
    logger = require('morgan');

module.exports = function(app,config){

  if ( !fs.existsSync(config.logs.dir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( config.logs.dir );
  }
  winston.add(winston.transports.File, {
    filename: config.logs.applicationLogFile,
    maxsize: config.logs.maxsize,
    maxFiles : 10,
    handleExceptions: true,
    exitOnError : false,
    json: true,
    tailable:true
  });

      winston.loggers.get(winston.transports.File).remove(winston.transports.Console);
      winston.exitOnError = false;

      winston.loggers.add('accessLog', {
    File: {
      filename: config.logs.accessLogFile,
      handleExceptions: true,
      json: true ,
      exitOnError : false,
      maxsize : config.logs.maxsize,
      maxFiles : 10,
      tailable:true
    }
  });

  winston.loggers.get('accessLog').remove(winston.transports.Console)

  /*winston.loggers.add('dbLog', {
    DailyRotateFile: {
      filename: config.logs.databaseLogFile ,
      handleExceptions: true ,
      exitOnError : false ,
      maxsize : config.logs.maxsize,
      json : false
    }
  });*/

  app.use(logger('stream'));
}