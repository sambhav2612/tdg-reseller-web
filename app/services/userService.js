/**
 * Created by himanshujain on 16/04/15.
 */

var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils'),
    logger = require('../utils/loggingUtils');

exports.subscribe = function(data, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.SUBSCRIBE.url),
        method: uris.SUBSCRIBE.method,
        body: data
    }
    
    apiUtils.httpRequest(options, cb);
};

exports.logout = function(user_id, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LOGOUT.url, {id: user_id}),
        method: uris.LOGOUT.method
    }
    apiUtils.httpRequest(options, cb);
};

exports.profile= function(user_name, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.USER_PROFILE.url, {user_name: user_name}),
        method: uris.USER_PROFILE.method
    }
    apiUtils.httpRequest(options, cb);
};

exports.bloggers= function(cb) {
    var options = {
        url: linkManager.getApiUrl(uris.BLOGGERS.url),
        method: uris.BLOGGERS.method
    }
    apiUtils.httpRequest(options, cb);
};

exports.recordHappiness = function(response, cb) {
    var user_happiness = {};
    user_happiness.happy = response.happy;
    user_happiness.url = response.url;
    user_happiness.user = response.user;
    user_happiness.comment = response.comment;
    user_happiness.email = response.email;
    user_happiness.logTime = Date.now();

    var user = new logger.happinessSchema(user_happiness);
    user.save();
    cb(null, 'Success');
};

exports.facebookReviews = function(cb) {
    var options = {
        url: linkManager.getForeignApiUrl(uris.REVIEWS.url),
        method: uris.REVIEWS.method
    }
    apiUtils.httpRequest(options, cb);
}

