var async = require('async'),
    userService = require('../services/userService'),
    starService = require('../services/starService'),
    licenseService = require('../services/licenseService'),
    productService = require('../services/productService'),
    productConstants = require('../constants/productConstants'),
    homeConstants = require('../constants/homeConstants'),
	pageInfo = require('../constants/pageInfoConstants');

/**
 * @desc Function to handle the landing url of app.
 * @param req
 * @param res
 */
exports.home = function(req,res){
  var cb = function(err, data) {
        res.tdgRender(pageInfo.LICENSE_HOME, err, data, req, res);
      },
      domainName = req.params.domain_name;

  async.parallel([
    function(callback) {
      licenseService.getDomainDetail(domainName, callback);
    }, function(callback) {
      licenseService.getDomainProducts(domainName, callback);
    }, function(callback) {
      blogService.blogContent('blue-camp-barot', callback);
    }
  ], function(err, results) {
    if(!err){
      var data = results[0];
      data.result.products = results[1].result.products;
      data.result.homeContent = results[2].result.blog.content;
    }
    cb(err, data)
  });
    //res.tdgRender(pageInfo.HOME, null, homeConstants.HOME_TOURS, req, res, true);
};

exports.comingSoon = function(req, res) {
  res.tdgRender({view:'pages/comingSoon', do_ab_test: false}, null, null, req, res);
};

exports.weeklyDestination = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({view: 'templates/weeklyDestination'}, err, data, req, res);
  };

  starService.getDestinationOfWeek(cb)
};

exports.homeFact = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({view: 'templates/destinationFact'}, err, data, req, res);
  };

  starService.homeDestinationFact(cb)
};

exports.subscribe = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };

  userService.subscribe(req.body, cb);
};