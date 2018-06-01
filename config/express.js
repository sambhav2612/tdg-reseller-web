var cookieParser = require('cookie-parser'),
    path = require('path'),
    _ = require('underscore'),
    helmet = require('helmet'),
    express = require('express'),
    sessions = require("client-sessions"),
    bodyParser = require('body-parser'),
    pageConstants = require('../app/constants/pageInfoConstants'),
    // verification = require('../app/constants/verification'),
    staticSEO = require('../app/constants/seoConstants'),
    seoUtils = require('../app/utils/seoUtils'),
    security = require('../app/utils/securityUtils'),
    errorController = require('../app/controllers/errorController');
    // abTesting = require('../app/filters/ABTesting');


module.exports = function (app, config) {


  if(process.env.NODE_ENV == 'dev'){
    //app.locals.pretty = true;
  }
  app.use(helmet());
  app.set("x-powered-by", false);

  app.locals.ENV = process.env.NODE_ENV;
  app.locals.doAnalytics = config.analytics;
  app.locals.host = config.host;
  app.locals.static = config.static;
  app.locals.phone = '+91-9210638305';

  app.set('svgUtils', require('../app/utils/svgUtils'));
  app.set('helperUtils', require('../app/utils/helperUtils'));

  app.set('pageConstants', pageConstants);
  // app.set('verification', verification);

  // use date utilities in templates
  app.set('moment', require('moment'));

 // app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(express.static(config.root + '/dist/public'));

  app.use(sessions({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg12', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
      ephemeral: true, // when true, cookie expires when the browser closes
      httpOnly: true, // when true, cookie is not accessible from javascript
      secure: false   // when true, cookie will only be sent over SSL
    }
  }));
  app.use(sessions({
    cookieName: 'user_session', // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg12', // should be a large unguessable string
    duration: 4 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
      ephemeral: true, // when true, cookie expires when the browser closes
      httpOnly: true, // when true, cookie is not accessible from javascript
      secure: false   // when true, cookie will only be sent over SSL
    }
  }));

  // set the Life time cookie
  app.use(function (req, res, next) {
    // check if client sent cookie
    //var ip = req.header('x-forwarded-for');
    //console.log(ip)
    //if(ip.indexOf('180.151.84.18')>=0 || ip.indexOf('180.151.233.50')>=0|| ip.indexOf('125.63.65.106')>=0
    //) {
    //  console.log("blocked ip");
    //  res.send('Ok')
    //} else {
      var cookie = security.getLifeCookie(req);
      if (cookie === undefined) {
        // no: set a new cookie
        security.setLifeCookie(req, res);
      }
      next();
    //}
  });
  //enable trust proxy
  app.enable('trust proxy');

  /**
   * TODO:refactor this method and create a viewHelpers file
   */
  app.use(function (req, res, next) {

    res.locals.req =req;

    //for error case no logging is required, its done on APIUtil
    res.tdgRender = function(view_option, err, data, req, res, isAdaptive, isAmp){

      var view = view_option.view;

      var seo_data = {}, cb, theme = 'tdg';
      _.extend(seo_data, staticSEO.DEFAULT_SEO_DATA);
      res.locals.seo_data = seo_data;

      if(err){
        cb = function() {
          if(err.statusCode >= 500){
            res.status(err.statusCode)
            return res.render('500')
          } else if(err.statusCode >= 400){
            res.status(err.statusCode)
            return res.render('404', data)
          }
        };
        errorController.checkRedirection(req, res, cb);

        //fallback state
        //res.status(500)
        //return res.render('500')
      } else {
        if(!view) {
          res.send(data);
          // security.createUserTrack(req, null, abTesting.getCohort(req, res), true);
        } else {
          data.seo_title = data.result.licensee.seo_title
          data.seo_dec = data.result.licensee.seo_dec
          data.seo_keywords = data.result.licensee.seo_keywords

          if(data.result.licensee && data.result.licensee.theme) {
            theme = data.result.licensee.theme;
          }
          security.setUserAcquisition(req, res);
          res.locals.seo_data = seo_data;
          data.user = req.user_session && req.user_session.user;

          if(data.user){
            security.setUserActivation(req, res, data.user);
          }

          data.growth = security.getGrowthTrack(req);
          // security.createUserTrack(req, view_option, abTesting.getCohort(req, res));

          if(security.getDeviceType(req).viewType ==='phone' && isAdaptive){
            view = view_option.mobile;
          }
          if(isAmp){
            view = view_option.amp;
          }
          view =  theme + '/'+ view;
          // view = view_option.do_ab_test ? abTesting.getView(view, req, res) : view;
          console.log("Req: "+ req.url +' | Ip:' + req.header('x-forwarded-for') || req.connection.remoteAddress)
          res.render(view,data)
        }
      }
    };
    next();
  });

  app.use(require('express-domain-middleware'));
  app.use(function errorHandler(err, req, res, next) {
    console.log('error on request %d %s %s', process.domain.id, req.method, req.url);
    console.log(err.stack);
    res.send(500, "Something bad happened. :(");
    if(err.domain) {
      //you should think about gracefully stopping & respawning your server
      //since an unhandled error might put your application into an unknown state
    }
  });

  // view engine setup
  //app.set('view options', {pretty: true});
  app.set('views', config.root + '/dist/views');
  app.set('view engine', 'jade');

  if(process.env.NODE_ENV != 'dev'){
    app.enable('view cache')
  }
}
