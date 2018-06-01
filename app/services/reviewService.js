/**
 * Created by himanshujain on 16/04/15.
 */

var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils'),
    logger = require('../utils/loggingUtils');

exports.ratingType = function(cb) {
    var options = {
        url: linkManager.getApiUrl(uris.RATING_TYPE_LIST.url),
        method: uris.RATING_TYPE_LIST.method
    }
    apiUtils.httpRequest(options, cb);
};


exports.saveReview = function(params, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.REVIEW.url),
        method: uris.REVIEW.method,
        body: params
    }
    apiUtils.httpRequest(options, cb);
};

exports.saveRating = function(params, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.REVIEW_RATING.url),
        method: uris.REVIEW_RATING.method,
        body: params
    }
    apiUtils.httpRequest(options, cb);

};
exports.updateRating = function(params, cb) {

    var options = {
        url: linkManager.getApiUrl(uris.UPDATE_REVIEW_RATING.url, {id: params.id}),
        method: uris.UPDATE_REVIEW_RATING.method,
        body: params
    };
    console.log(options)
    apiUtils.httpRequest(options, cb);
};
exports.getReviews = function(params, cb) {

    var options = {
        url: linkManager.getApiUrl(uris.REVIEWS.url, {id: params.id}),
        method: uris.REVIEWS.method,
    };
    console.log(options)
    apiUtils.httpRequest(options, cb);
};
exports.getRatings = function(params, cb) {

    var options = {
        url: linkManager.getApiUrl(uris.REVIEW_RATINGS.url, {id: params.id}),
        method: uris.REVIEW_RATINGS.method,
    };
    console.log(options)
    apiUtils.httpRequest(options, cb);
};

