if (process.env.NODE_ENV === 'prod') require('newrelic');

var express = require('express'),
    passport = require('passport');

var app = express();

var config = require('./app/appConfig'),
    logger = require('./app/utils/loggingUtils');


// express settings
require('./config/express')(app, config);

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//require('./modules/tdg-static/config/routes')(app, passport);
require('./config/routes')(app, passport);

//require('./config/winston')(app, config);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Page not found : '+ req.originalUrl);
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'dev') {
  app.use(function(err, req, res, next) {
    logger.error(err.stack)

    res.status(err.status || 500);
    res.render('500', {
      message: err.stack,
      error: err
    });

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  logger.error(err.stack)
  logger.error('Requested url = ' + req.originalUrl)

  res.status(err.status   || 500);
  if(err.status >= 400 && err.status < 500){
    return res.render('404', {
      message: err.message,
      error: {}
    });
  } else {
    return res.render('500', {
      message: err.message,
      error: {}
    });
  }

});


app.listen(config.port,function(){
  console.log("started on port %d", config.port);
})

module.exports = app;
