/**
 * Created by Himanshu Jain on 16/12/15.
 */

var async = require('async'),
    explorerService = require('../services/explorerService'),
    productService = require('../services/productService'),
    linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils');
var countriesList = function(cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.COUNTRY_MAP.url),
    method: uris.COUNTRY_MAP.method
  };
  apiUtils.httpRequest(options, cb);
}


exports.sitemap = function(query, cb) {

  //var options = {
  //  url: linkManager.getApiUrl(uris.SITEMAP.url),
  //  method: uris.SITEMAP.method
  //};
  //apiUtils.httpRequest(options, cb);

  async.parallel([
    function(callback) {
      countriesList(callback);
    }, function(callback) {
      explorerService.getCollectionList('', 1, callback);
    }, function(callback) {
      productService.getPlans('0', callback);
    }, function(callback) {
      productService.getPlans('1', callback);
    }


  ], function(err, results) {
    var data ={};
    if(!err){
      data.countries = results[0].result.countries;
      data.collection = results[1].result.collections;
      data.plans = results[2].result.plans;
      data.trips = results[3].result.plans;
    }

    cb(err, {result: data})
  });
};

exports.mapView = function(query, cb) {

  var options = {
    url: linkManager.getForeignApiUrl(uris.ACTIVE_LOCATIONS.url),
    method: uris.ACTIVE_LOCATIONS.method
  };
  apiUtils.httpRequest(options, cb);
};

exports.countries = function(cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.COUNTRY_MAP.url, {slug:'countries'}),
    method: uris.COUNTRY_MAP.method
  };
  apiUtils.httpRequest(options, cb);
};

exports.countryListing = function(country_slug, meta_slug, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.COUNTRY_LIST.url, {country_slug: country_slug}, {slug:meta_slug}),
    method: uris.COUNTRY_LIST.method
  };
  apiUtils.httpRequest(options, cb);
};


exports.stateListing = function(country_slug, state_slug, meta_slug, page_type, cb, limit) {
  var query = {slug:meta_slug};
  query.page_type = page_type;
  if(limit) {
    query.limit = limit;
  }
  var options = {
    url: linkManager.getApiUrl(uris.STATE_LIST.url, {state_slug: state_slug}, query),
    method: uris.STATE_LIST.method
  };
  apiUtils.httpRequest(options, cb);
};

exports.foodListing = function(state_slug, meta_slug, cb) {
  var query = {state_slug: state_slug, slug:meta_slug};
  var options = {
    url: linkManager.getApiUrlQuery(uris.STATE_FOOD.url, query),
    method: uris.STATE_FOOD.method
  };
  apiUtils.httpRequest(options, cb);
};