/**
 * Created by Himanshu wolf on 21/03/16.
 */

var explorerService = require('../services/explorerService'),
    securityUtils = require('../utils/securityUtils'),
    seoConstants = require('../constants/seoConstants'),
    pageConstants = require('../constants/pageInfoConstants');

exports.getCollections = function(req, res) {
  var slug = '';
  var cb = function(err, data) {

    res.tdgRender(pageConstants.COLLECTION, err, data, req, res, true);
  };
  explorerService.getCollectionList(slug, 1, cb);
};

exports.collectionItems = function(req, res) {

  var meta_slug = req.originalUrl.substr(1);
  var cb = function(err, data) {
    res.tdgRender(pageConstants.COLLECTION_LIST, err, data, req, res, true);
      },
      collection_slug = req.params.item_slug;
  explorerService.getCollectionItems(collection_slug, meta_slug, cb);

};

exports.collectionMonthList = function(req, res) {
  var meta_slug = req.originalUrl.substr(1).split('?')[0];
  var cb = function(err, data) {
        res.tdgRender(pageConstants.CALENDAR_LIST, err, data, req, res,true);
      },
      filter_slug = req.params.month;
  cb(null, {})
  //explorerService.filterCollectionItems({month: filter_slug}, meta_slug , cb);
};

exports.collectionMonths = function(req, res) {
  var meta_slug = req.originalUrl.substr(1).split('?')[0];
    var page = req.query.page;
    var cb = function(err, data) {
        if(page){
            res.tdgRender({view: 'templates/filterDestination', do_ab_test : false}, err, data, req, res);
            // res.tdgRender({view: 'templates/activityListType', do_ab_test : false}, err, data, req, res);
        }else{
            res.tdgRender(pageConstants.COLLECTION_LIST_MONTHS, err, data, req, res, true);
        }

    },
      filter_slug = req.params.month;
  explorerService.filterCollectionItems({month: filter_slug}, meta_slug , page, cb);
};

exports.collectionInterests = function(req, res) {
  var meta_slug = req.originalUrl.substr(1).split('?')[0];
    var page = req.query.page;
    var cb = function(err, data) {
        if(page){
            res.tdgRender({view: 'templates/filterDestination', do_ab_test : false}, err, data, req, res);
            // res.tdgRender({view: 'templates/activityListType', do_ab_test : false}, err, data, req, res);
        }else{
            res.tdgRender(pageConstants.COLLECTION_LIST_INTERESTS, err, data, req, res);
        }

    },
      filter_slug = req.params.interest_slug;
  explorerService.filterCollectionItems({interest: filter_slug}, meta_slug, page , cb);
};


exports.collectionTags = function(req, res) {
  var meta_slug = req.originalUrl.substr(1).split('?')[0];
    var page = req.query.page;
    var cb = function(err, data) {
        if(page){
            res.tdgRender({view: 'templates/filterDestination', do_ab_test : false}, err, data, req, res);
            // res.tdgRender({view: 'templates/activityListType', do_ab_test : false}, err, data, req, res);
        }else{
            res.tdgRender(pageConstants.COLLECTION_LIST_TAGS, err, data, req, res);
        }

    },
      filter_slug = req.params.tag_slug;
  explorerService.filterCollectionItems({tag: filter_slug}, meta_slug, page , cb);
};

exports.collectionPartner = function(req, res) {
  var meta_slug = req.originalUrl.substr(1).split('?')[0];
    var page = req.query.page;
    var cb = function(err, data) {
        if(page){
            res.tdgRender({view: 'templates/filterDestination', do_ab_test : false}, err, data, req, res);
            // res.tdgRender({view: 'templates/activityListType', do_ab_test : false}, err, data, req, res);
        }else{
            res.tdgRender(pageConstants.COLLECTION_LIST_TRAVELLING_WITH, err, data, req, res);
        }

    },
      filter_slug = req.params.travel_with;
  explorerService.filterCollectionItems({travel_partner: filter_slug}, meta_slug, page , cb);
};

exports.activityCollection = function(req, res) {
  var slug = '';
  var cb = function(err, data) {
        res.tdgRender(pageConstants.ACTIVITY_COLLECTION_LIST, err, data, req, res, true);
      };
  explorerService.getCollectionList(slug, 3, cb);
};

exports.activityCollectionItems = function(req, res) {
  var meta_slug = req.originalUrl.substr(1);
  var cb = function(err, data) {
    res.tdgRender(pageConstants.ACTIVITY_COLLECTION, err, data, req, res, true);
      },
  collection_slug = req.params.item_slug;
  explorerService.getCollectionItems(collection_slug, meta_slug, cb);
}

exports.openExplorer = function(req, res) {
  var cb = function(err, data) {
        data.seo_data = seoConstants.EXPLORE;
        res.tdgRender(pageConstants.EXPLORE, err, data, req, res, true);
      },
      filters = req.query.filters || [];
  explorerService.openExplorer(filters, cb);
};

exports.filterExplorer = function(req, res) {
  var cb = function(err, data) {
        res.tdgRender({view: 'templates/exploreResults'}, err, data, req, res);
      },
      filters = req.query.filters || [];
  explorerService.openExplorer(filters, cb);
};

