/**
 * Created by Himanshu wolf on 21/03/16.
 */


var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils');

exports.getCollectionList = function(slug, collection_type, cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.COLLECTION.url, {slug: slug, collection_type: collection_type}),
    method: uris.COLLECTION.method
  };
  apiUtils.httpRequest(options, cb);
};

exports.getRegionList = function(slug, cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.COLLECTION.url, {slug: slug}),
    method: uris.COLLECTION.method
  };
  apiUtils.httpRequest(options, cb);
};

exports.getCollectionItems = function(slug, meta_slug, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.COLLECTION_LIST.url, {collection_slug: slug}, {slug: meta_slug}),
    method: uris.COLLECTION_LIST.method
  };
  apiUtils.httpRequest(options, cb);
};

exports.filterCollectionItems = function(filter, meta_slug, page, cb) {
  filter.slug = meta_slug;
  filter.page = page ? page :1;
  var options = {
    url: linkManager.getApiUrlQuery(uris.DESTINATION_FILTER.url, filter),
    method: uris.DESTINATION_FILTER.method
  };
  apiUtils.httpRequest(options, cb);
};


exports.openExplorer = function(filters, cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.EXPLORE.url, {filters: filters}),
    method: uris.EXPLORE.method
  }
  apiUtils.httpRequest(options, cb);
};