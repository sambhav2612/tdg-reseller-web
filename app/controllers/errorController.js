/**
 * Created by himanshujain on 07/04/15.
 */

var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils'),
    config = require('../appConfig');

exports._404 = function(req, res) {
  res.status(404);
  res.tdgRender({view:'404'}, null, {}, req,  res);
};

exports._500 = function(req, res) {
  res.status(500);
  res.tdgRender({view:'500'}, null, {}, req,  res);
};

exports.checkRedirection = function(req, res, next) {
  var cb = function(err, data) {
    if(err || data.error) {
      next();
    } else {
      res.redirect(data.result.url.status_code, config.host + '/'+ data.result.url.actual_slug);
    }

  } ;

  var options = {
    url: linkManager.getApiUrlQuery(uris.URL_REDIRECTION.url, {slug : req.originalUrl.substr(1)}),
    method: uris.URL_REDIRECTION.method
  }
  apiUtils.httpRequest(options, cb);
}
