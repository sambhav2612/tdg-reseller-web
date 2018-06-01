/**
 * Created by Himanshu wolf on 28/03/17.
 */


var linkManager = require('../utils/LinkManager'),
    config = require('../appConfig'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils');


exports.getEventList = function(domain, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_EVENTS.url, {domain: domain}),
        method: uris.LICENSE_EVENTS.method
    };
    apiUtils.httpRequest(options, cb);

};

exports.getEvent = function(domain, event_slug, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_EVENT.url, {domain: domain, event_slug: event_slug}),
        method: uris.LICENSE_EVENT.method
    };
    apiUtils.httpRequest(options, cb);

};