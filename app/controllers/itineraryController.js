/**
 * Created by Himanshu wolf on 29/11/15.
 */

var itineraryService = require('../services/itineraryService'),
    securityUtils = require('../utils/securityUtils'),
    pageConstants = require('../constants/pageInfoConstants'),
    tripDetails = require('../constants/tripDetails'),
    seoConstants = require('../constants/seoConstants');

exports.getItinerary = function(req, res) {


  var cb = function(err, data) {
    if(data){
      data.result.preferences = req.session.preferences;
    }
    res.tdgRender(pageConstants.ITINERARY, err, data, req, res);
  };
  securityUtils.setPreferences(req, req.query);
  itineraryService.getItinerary(req.session.preferences, req.params.hash, cb);

};

exports.bookItinerary = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  itineraryService.requestQuote(req.session.preferences, req.body, cb);

};

exports.getQuote = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  itineraryService.requestQuote(req.session.preferences, req.body, cb);

};

exports.bookTrip = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  itineraryService.bookTrip(req.body, cb);

};

exports.updateQuote = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  itineraryService.updateQuote(req.session.preferences, req.body, cb);
};

exports.planPage = function(req, res) {
    res.tdgRender(pageConstants.PLAN_PAGE, null,{seo_data: seoConstants.PLAN_PAGE}, req, res);
};

exports.planBhimtal = function(req, res) {
  res.tdgRender(pageConstants.PLAN_BHIMTAL, null,{seo_data: seoConstants.TRIP_BHIMTAL}, req, res);
}
exports.planManaliJuly = function(req, res) {
  res.tdgRender(pageConstants.PLAN_MANALI_JULY, null,{seo_data: seoConstants.TRIP_MANALI}, req, res);
}

exports.planRoopkund = function(req, res) {
  res.tdgRender(pageConstants.PLAN_ROOPKUND, null,{seo_data: seoConstants.TRIP_ROOPKUND}, req, res);
}

exports.tripMalanaAug = function(req, res) {
  res.tdgRender(pageConstants.TRIP_MALANA_AUG, null,{seo_data: seoConstants.TRIP_MALANA}, req, res, true);
}
exports.tripDetail = function(req, res) {
  var slug = req.params.slug;
  var trip =  tripDetails.TRIP_DETAILS[tripDetails.TRIP_TEMPLATES[slug]];
  res.tdgRender(pageConstants.TRIP_DETAILS, null,{trip:trip, seo_data: trip.seo_data}, req, res, true);
}

exports.findItinerary = function(req, res, next){
  if(!req.params.via){
    delete req.params.via;
  }
  var cb = function(err, data){
    if(data.result.itineraries.length){
      res.tdgRender(pageConstants.FIND_ITINERARY, err, data, req, res);
    } else {
      next();
    }
  }
  itineraryService.findItinerary(req.params, cb);
}

exports.openItinerary = function(req, res, next){
  var params = req.params;
  var itinerary_slug = 'from-' + params.source;
  if(params.via){
    itinerary_slug += '-via-'+ params.via;
  }
  itinerary_slug += '-to-' +  params.destination +  '-' +  params.slug;
  var slug_param = {itinerary_slug : itinerary_slug};

  var cb = function(err, data){
      res.tdgRender(pageConstants.ITINERARY, err, data, req, res);
  }
  itineraryService.openItinerary(slug_param, cb);
}