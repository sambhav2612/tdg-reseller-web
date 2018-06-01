/**
 * Created by Himanshu wolf on 25/02/16.
 */

var userService = require('../services/userService'),
    starService = require('../services/starService'),
    logger = require('../utils/loggingUtils'),
    security = require('../utils/securityUtils'),
    pageInfo = require('../constants/pageInfoConstants');

exports.logout = function(req, res) {
  var query = req.query.returnUrl,
  cb = function(err, data) {
    req.user_session.user = null;
    res.redirect(query || '/');
  },

  user_id = req.user_session.user.id;

  userService.logout(user_id, cb);
};

exports.emailTrack = function(req, res) {
  var query = req.query;
  if(query) {
    var user = new logger.emailSchema(query);
    user.save();
  }
  res.end();
};

exports.setSource = function(req, res) {
  var position = req.body.position, lat, long;
  if(position) {
    position = position.split('~');
    lat = Math.round(parseFloat(position[0])*1000000)/1000000;
    long = Math.round(parseFloat(position[1])*1000000)/1000000;
  }
  res.end();
}

exports.profile = function(req, res) {
  var user = req.params.user_name;
  var cb = function(err, data) {
    res.tdgRender(pageInfo.PROFILE, err, data, req, res);
  }
  userService.profile(user, cb);
};

exports.exitResponse = function(req, res) {
  var response = req.body;
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  }
  response.user = security.getLifeCookie(req);
  userService.recordHappiness(response, cb);
};

exports.contributors = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender(pageInfo.CONTRIBUTORS, err, data, req,  res);
  }
  userService.bloggers(cb);
};