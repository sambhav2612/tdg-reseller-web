/**
 * Created by Himanshu wolf on 29/11/15.
 */



var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils'),
    DEFAULT_SOURCE_ID = 'new-delhi';

exports.getItinerary = function(preferences, mongo_id, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.ITINERARY.url, {mongo_id: mongo_id}),
    method: uris.ITINERARY.method
  };
  apiUtils.httpRequest(options, cb);

};
exports.bookTrip = function(body, cb) {
  var params = body;
  //if(!params.id) {
  params.source = body.source ? body.source : DEFAULT_SOURCE_ID;
  params.route = body.route_id.split(',');

  //}
  if(body.start_date) {
    params.start_date = new Date(body.start_date);
    params.travel_time = parseFloat(body.travel_time);
    params.budget = parseFloat(body.budget);
  }

  var options = {
    url: linkManager.getApiUrl(uris.GET_QUOTE.url),
    method: uris.GET_QUOTE.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
};
exports.requestQuote = function(preferences, body, cb) {
  var params = body;
  //if(!params.id) {
    params.source = body.source ? body.source : DEFAULT_SOURCE_ID;
    params.route = body.route_id.split(',');

  //}
  if(body.start_date) {
    preferences.start_date = body.start_date;
    preferences.travel_time = parseFloat(body.travel_time);
    body.budget = parseFloat(body.budget);
  }
  params.start_date =  new Date(preferences.start_date);
  params.travel_time = preferences.travel_time;
  params.traveling_with = preferences.traveling_with;
  params.interests = preferences.interests;

  var options = {
    url: linkManager.getApiUrl(uris.GET_QUOTE.url),
    method: uris.GET_QUOTE.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
};
exports.updateQuote = function(preferences, body, cb) {

  var params = body;
  params.source = body.source ? body.source : DEFAULT_SOURCE_ID;
  params.route = body.route_id.split(',');

  params.start_date = new Date(body.start_date);

  var options = {
    url: linkManager.getApiUrl(uris.UPDATE_QUOTE.url, {id: params.id}),
    method: uris.UPDATE_QUOTE.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
};  

exports.findItinerary = function (params, cb) {
  var options = {
    url : linkManager.getApiUrlQuery(uris.FIND_ITINERARY.url, params),
    method: uris.FIND_ITINERARY.method
  };
  apiUtils.httpRequest(options, function(err, data){
    if(err){
      cb(err, data);
    }else{
      getItinerariesWebURL(err, data, cb);
    }
  });
}


exports.openItinerary = function (params, cb) {

  var options = {
    url : linkManager.getApiUrl(uris.ITINERARY.url, params, {}),
    method: uris.ITINERARY.method
  };
  apiUtils.httpRequest(options, cb);
}


var getItinerariesWebURL = function (err, data, cb) {
  var webURLs=[], webURL, itinerary_slug,
      itineraries = data.result.itineraries;

  for(var idx in itineraries){
    webURL = '',
    itinerary_slug = '';
    itinerary = itineraries[idx];
    webURL += 'from--' + itinerary.source.slug;
    itinerary_slug += 'from-' + itinerary.source.slug;
    if(itinerary.mid_nodes.length){
      webURL += '/via-';
      itinerary_slug += '-via';
      var mid_nodes = itinerary.mid_nodes;
      for(j in mid_nodes){
        webURL += '-' + mid_nodes[j];
        itinerary_slug += '-' + mid_nodes[j];
      }
    }
    webURL += '/to--' + itinerary.destination.slug;
    itinerary_slug += '-to-' + itinerary.destination.slug + '-';
    webURL += '/' + itinerary.slug.replace(itinerary_slug, '');
    webURLs.push(webURL);
  }
  data.itineraryUrls = webURLs;
  cb && cb(err, data);
}