var md5 = require('blueimp-md5').md5,
    logger = require('./loggingUtils'),
    moment = require('moment'),
    mydevice = require('device'),
    config = require('../appConfig'),
    refererParser = require('referer-parser'),
    _ = require('underscore');

var roles = {
  USER_ADMIN : 'USER_ADMIN',
  USER : 'TDG_USER'
    }, LIFETIME_COOKIE_NAME = 'tdg_uld';

var defaults = {
  TRAVEL_TIME : 72,
  START_DATE_TIME : 10,
  BUDGET : '',
  SOURCE : 'new-delhi'
};
var travel_partner_map = {
  friends : ['adventure'],
  couple : ['romantic'],
  solo : ['leisure'],
  family : ['spiritual']
}

var mapInterest = function(preference, query) {
  if(query.traveling_with) {
    //preference.interests = travel_partner_map[query.traveling_with];
    preference.traveling_with = query.traveling_with;
  }
};
var getDeviceType = function(req) {
  var userDevice = mydevice(req.headers['user-agent']);
  var deviceType = userDevice.type;
  global.deviceType = deviceType;
  var viewType = deviceType == 'bot' && /^.*mobile.*$/.test(req.headers['user-agent'].toLowerCase())? 'phone' : userDevice.type;

  return  {viewType: viewType, deviceType: deviceType};
}

Object.freeze(roles);

exports.getRolesList = function(){
  return roles
};


exports.hasSession = function(req, res, next){
  if(req.user_session.user) {
    next();
  } else {
    req.session.returnUrl = req.url;
    res.tdgRender('pages/login', null, {}, req, res);
    //res.render('pages/login');
  }
}

exports.setPreferences = function(req, query, isFilter){
  //if(_.isEmpty(req.session.preferences)) {
    var preference= {}, start_date = moment(); //today

    var start_date_val = start_date.add(defaults.START_DATE_TIME, 'days').format('L');

  if(req.session.preferences) {
    //get the preferences from the session
    preference.travel_time = req.session.preferences.travel_time;
    preference.start_date =  req.session.preferences.start_date;
    preference.interests =  req.session.preferences.interests;
    preference.budget =  req.session.preferences.budget;
  }

  //over ride the preferences from query params
    preference.travel_time =  query.travel_time? query.travel_time * 24 : preference.travel_time || defaults.TRAVEL_TIME;
    preference.start_date =  query.start_date? query.start_date  : preference.start_date || start_date_val;
    preference.interests =  query.interests || [];
    preference.budget =  query.budget || defaults.BUDGET;
    preference.source =  query.source || defaults.SOURCE;
    preference.traveling_with =  query.traveling_with || '';
    if(isFilter) {
      preference.interests =  query.interests? query.interests  : [];
      preference.traveling_with =  query.traveling_with? query.traveling_with  : '';
      preference.source =  query.source || defaults.SOURCE;
    }

    req.session.preferences = preference;
  //}

};

exports.createUserTrack = function(req, view, abView, is_ajax) {
  var user_data = {};
  if(config.env == 'prod' && getDeviceType(req).deviceType !='bot') {
    user_data.ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;
    user_data.preferences = req.session.preferences;
    user_data.query = req.query;
    user_data.refererRaw = req.header('referer')? req.header('referer'): '';
    user_data.referer = new refererParser(req.header('referer')? req.header('referer'): '');

    // removing the additional info
    delete(user_data.referer.referers);

    user_data.user = req.user_session.user && req.user_session.user.id;
    user_data.lifetimeCookie = req.cookies[LIFETIME_COOKIE_NAME];
    user_data.url = config.host + req.url;
    user_data.logTime = Date.now();
    user_data.pageInfo = view;
    user_data.abCohort = abView;
    user_data.isAjax = is_ajax;

    var user = new logger.pageSchema(user_data);
    user.save();
  }
  return {user_data: user_data};


};


/**
 * Converts plaintext password to a hash and then converts it to base64 text
 * @param password
 * @returns {*|String}
 */
exports.encryptPassword = function(password){
  return new Buffer(md5(password), 'hex').toString('base64')
}

exports.getLifeCookie = function (req) {
  return req.cookies[LIFETIME_COOKIE_NAME];
};

exports.setLifeCookie = function (req, res) {
  var ip_address = req.header('x-forwarded-for') || req.connection.remoteAddress;
  ip_address += Date.now();
  //logger.info('IP recorded' + ip_address);
  res.cookie(LIFETIME_COOKIE_NAME, md5(ip_address, 'hex'),
      { maxAge: 300 * 24 * 60 * 60 * 1000 // 300 days
      });

};

exports.setUserAcquisition = function (req, res) {

  if(req.cookies.acquisition) {
    return true;
  }

  var acquisitionJson = {
    medium : req.query.utm_medium || '',
    source : req.query.utm_source || req.get('Referrer') || 'direct',
    campaign : req.query.utm_campaign || '',
    content : req.query.utm_content || '',
    page : req.originalUrl || '',
    ip :  req.ip || req.ips ||''
  };
  var acquisition = JSON.stringify(acquisitionJson);
  res.cookie('acquisition', acquisition, { maxAge: 1000 * 60 * 60 * 24 * 300, httpOnly: true, encode: String });
};

exports.setUserActivation = function (req, res, user) {
  if(req.cookies.uld) {
    var uldJson = JSON.parse(req.cookies.uld);
    var activation_level = uldJson.activation_level;
    /*----------------------------------------------------------------------------------------------------------------------
     activation level number signifies

     0: 'visitor',
     1: 'repeatVisitor',
     2: 'subscriber',
     3: 'user',
     4: 'repeatUser',
     5: 'preCustomer',
     6: 'customer',
     7: 'loyalCustomer'
     ----------------------------------------------------------------------------------------------------------------------*/
    switch(activation_level){
      case 0:{
        uldJson.activation_level = 3;
        break;
      }
      case 1:{
        uldJson.activation_level = 3;
        break;
      }
      case 2:{
        uldJson.activation_level = 3;
        break;
      }
      case 3:{
        uldJson.activation_level = 4;
        break;
      }
    }
    uldJson.user_name = uldJson.user_name || user.user_name;
    uldJson.user_email = uldJson.user_email || user.email;
    uldJson.user_mobile = uldJson.user_mobile || user.mobile || '';
    res.cookie('uld', JSON.stringify(uldJson), { maxAge: 1000 * 60 * 60 * 24 * 300, encode: String });
  }
};

exports.getGrowthTrack = function (req) {
  var uld = req.cookies.uld || '', growth = {};
  if(uld){
    growth = {
      activation_level: JSON.parse(uld).activation_level
    };
    if(req.cookies.acquisition){
      growth.acquisition_source = JSON.parse(req.cookies.acquisition).source;
      growth.acquisition_medium = JSON.parse(req.cookies.acquisition).medium;
      growth.acquisition_page = JSON.parse(req.cookies.acquisition).page;
    }
  }
  return growth;
}

exports.getDeviceType = getDeviceType;




