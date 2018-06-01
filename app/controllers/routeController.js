/**
 * Created by Himanshu wolf on 02/06/17.
 */

var async = require('async'),
    // destService = require('../services/destinationService'),
    linkManager = require('../utils/LinkManager'),
    // transportUtils = require('../utils/transportUtils'),
    pageConstants = require('../constants/pageInfoConstants');

exports.findRoutes = function(req, res) {
  var destination = req.params.destination,
      source = req.params.source;

  var cb = function(err, data) {
    if(data){
      data.result.preferences = req.session.preferences;
    }
    res.tdgRender(pageConstants.FIND_ROUTE, err, data, req, res, true);
  };

  async.parallel([
    function(callback) {
      // destService.routeInfo(destination, source, req.session.preferences, callback);
    }, function(callback) {
      // destService.findRoutes(destination, source, req.session.preferences, callback);
    }, function(callback) {
      // destService.findRoutesFrom(destination, req.session.preferences, callback);
    }

  ], function(err, results) {
    if(!err){
      var data = results[1];
      data.result.source = results[0].result.source;
      data.result.destination = results[0].result.destination;
      data.result.active_routes = results[2].result.routes;
      // data.result.cabs = transportUtils.getCabs(data.result.source)
    }

    cb(err, data)
  });
};

exports.findCabs = function(req, res) {

  var source = req.query.from || 'new-delhi', destination = req.query.to || 'manali';
  var cb = function(err, data) {
    if (data.result.road){
      // data.result.cabs = transportUtils.getCabs(data.result.road.source);
      res.tdgRender(pageConstants.TRANSPORT_SEARCH, err, data, req, res, true);
    } else {
      res.tdgRender(pageConstants.TRANSPORT_SEARCH, err, {result: ''}, req, res, true);
      //res.tdgRender(pageConstants.TRANSPORT_SEARCH, err, {}, req, res);
    }
  };

  // destService.findRoutes(destination, source, req.session.preferences, cb);
};