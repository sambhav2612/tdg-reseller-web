var async = require('async'),
    affiliateService  = require('../services/affiliateService'),
    // location_constant = require('../constants/tourBoksLocationConstants'),
    sitemapService = require('../services/sitemapService'),
    explorerService = require('../services/explorerService'),
    seoConstants = require('../constants/seoConstants'),
    pageConstants = require('../constants/pageInfoConstants');

/**
 * @desc Function to handle the landing url of app.
 * @param req
 * @param res
 */

exports.sitemap = function(req, res) {
  var cb = function(err, data) {
    if(data) {
      data.seo_data = seoConstants.SITEMAP;
    }
    res.tdgRender(pageConstants.SITEMAP, err, data, req, res, true);
  };

  sitemapService.sitemap(req.body, cb);
};

exports.mapView = function(req, res) {
  var cb = function(err, data) {
    if(data) {
      data.seo_data = seoConstants.MAP_VIEW;
    }
    res.tdgRender(pageConstants.MAP_VIEW, err, data, req, res);
  };

  sitemapService.mapView(req.body, cb);
};

exports.countries = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender(pageConstants.COUNTRIES, err, data, req, res);
  };
  sitemapService.countries(cb);
};

exports.countryListing = function(req, res) {
  var cb = function(err, data) {
     res.tdgRender(pageConstants.COUNTRY_LIST, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      meta_slug = req.originalUrl.substr(1);
  var params = {};

  // if (location_constant[country_slug]){
  //   params.country = [location_constant[country_slug]]
  // }

  async.parallel([
    function(callback) {
      sitemapService.countryListing(country_slug, meta_slug, callback);
    }, function(callback) {
      explorerService.getRegionList(meta_slug + '/region', callback)
    }, function(callback) {
      explorerService.getCollectionList(meta_slug, 5, callback);
    }],
    function(err, results) {
    var data = results[0];
    if(!err){
      data.result.regions = results[1].result.collections;
      data.result.collections = results[2].result.collections;
    }
    cb(err, data)
  })
};

exports.countryCollection = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender(pageConstants.COLLECTION_LIST, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      slug = req.params.collection_slug,
      meta_slug = req.originalUrl.substr(1);

  explorerService.getCollectionItems(slug, meta_slug, cb);
};

exports.stateListing = function(req, res) {

  var cb = function(err, data) {
        res.tdgRender(pageConstants.STATE_LIST, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      state_slug = req.params.state_slug,
      meta_slug = req.originalUrl.substr(1);

  async.parallel([
    function(callback) {
      sitemapService.stateListing(country_slug, state_slug, meta_slug, 'state', callback);
    }, function(callback) {
      sitemapService.foodListing(state_slug, meta_slug, callback);
    }, function(callback) {
      explorerService.getCollectionList(meta_slug, 6, callback);
    }

  ], function(err, results) {
    var data = results[0];
    if(!err){
      data.result.foodstuffs = results[1].result.foodstuffs;
      data.result.collections = results[2].result.collections;
    }
    cb(err, data);
  });

};

exports.stateTopListing = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender(pageConstants.STATE_TOP_LIST, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      state_slug = req.params.state_slug,
      meta_slug = req.originalUrl.substr(1);

  sitemapService.stateListing(country_slug, state_slug, meta_slug, 'state_top', cb, 5);
};

exports.stateMapListing = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender(pageConstants.STATE_MAP_LIST, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      state_slug = req.params.state_slug,
      meta_slug = req.originalUrl.substr(1);

  sitemapService.stateListing(country_slug, state_slug, meta_slug, 'state_map', cb);
};
exports.stateGalleryListing = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender(pageConstants.STATE_GALLERY, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      state_slug = req.params.state_slug,
      meta_slug = req.originalUrl.substr(1);

  sitemapService.stateListing(country_slug, state_slug, meta_slug, 'state_gallery', cb);
};
exports.stateFoodListing = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender(pageConstants.STATE_FOOD_LIST, err, data, req, res);
      },
      country_slug = req.params.country_slug,
      state_slug = req.params.state_slug,
      meta_slug = req.originalUrl.substr(1);

  sitemapService.foodListing(state_slug, meta_slug, cb);
};

exports.stateCollection = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender(pageConstants.COLLECTION_LIST, err, data, req, res);
      },
      slug = req.params.collection_slug,
      meta_slug = req.originalUrl.substr(1);

  explorerService.getCollectionItems(slug, meta_slug, cb);
};

exports.regionListing = function(req, res) {
  var meta_slug = req.originalUrl.substr(1);
  var cb = function(err, data) {
        res.tdgRender(pageConstants.COLLECTION_LIST, err, data, req, res);
      },
      collection_slug = req.params.collection_slug;

  explorerService.getCollectionItems(collection_slug, meta_slug, cb);
};