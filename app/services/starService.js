/**
 * Created by Himanshu wolf on 27/12/15.
 * @summary - This service will contain all the unique features of TDG aka Star Features
 */

var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils');

exports.feelingToTravel = function( cb) {

  var options = {
    url: linkManager.getApiUrl(uris.FEELING_TRAVEL.url),
    method: uris.FEELING_TRAVEL.method
  };

  apiUtils.httpRequest(options, cb);
};

exports.getDestinationOfWeek = function(cb) {
  var options = {
    url: linkManager.getApiUrl(uris.LOCATION_WEEKLY.url),
    method: uris.LOCATION_WEEKLY.method
  };

  apiUtils.httpRequest(options, cb);
}

exports.homeDestinationFact = function(cb) {
  var options = {
    url: linkManager.getApiUrl(uris.DESTINATION_FACT.url),
    method: uris.DESTINATION_FACT.method
  };

  apiUtils.httpRequest(options, cb);
};

exports.releaseTimeLine = function(cb) {
  var options = {
    url: linkManager.getApiUrl(uris.RELEASE.url),
    method: uris.RELEASE.method
  };

  apiUtils.httpRequest(options, cb);
}