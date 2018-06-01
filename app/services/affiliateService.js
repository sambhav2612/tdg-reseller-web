/**
 Created by Harshit Maheshwari on 30/02/2017
 */
var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    appConfig = require('../appConfig'),
    // location_constant = require('../constants/tourBoksLocationConstants'),
    apiUtils = require('../utils/APIUtils'),
    _ = require('underscore');

// For Product Search
exports.tourBoksProductSearch = function(params ,cb) {

    params.currency = 'INR';
    var options = {
        url: linkManager.getTourBoksApiUrl(uris.TOURBOKS_PRODUCT_SEARCH.url),
        method: uris.TOURBOKS_PRODUCT_SEARCH.method,
        body: params
    };

    apiUtils.tourBoksRequest(options, cb);
};

// for the details of product search
exports.tourBoksProductDetails = function(id,cb) {

    var options = {
        url: linkManager.getTourBoksApiUrl(uris.TOURBOKS_PRODUCT_DETAILS.url, {'id' : id}, {'currency' : 'INR'}),
        method: uris.TOURBOKS_PRODUCT_DETAILS.method
        }, parseProduct = function(err, data) {
        if(!err){
            data.duration = Math.ceil(data.duration/86400)
        }

        cb(err, data)
    }
    apiUtils.tourBoksRequest(options, parseProduct);
};


// for availabity of dates
exports.tourBoksAvailableDates = function (params, cb) {
    var options = {
        url: linkManager.getTourBoksApiUrl(uris.TOURBOKS_PRODUCT_AVAILABLE_DATES.url),
        method: uris.TOURBOKS_PRODUCT_AVAILABLE_DATES.method,
        body: params
    };
    apiUtils.tourBoksRequest(options, cb);

};


exports.tourBoksTimeSlot = function (params, cb) {
    var options = {
        url: linkManager.getTourBoksApiUrl(uris.TOURBOKS_PRODUCT_AVAILABILITY.url),
        method: uris.TOURBOKS_PRODUCT_AVAILABILITY.method,
        body: params
    };
    apiUtils.tourBoksRequest(options, cb);

};

exports.tourBoksCreateOrder = function (params, cb) {
    var options = {
        url: linkManager.getTourBoksApiUrl(uris.TOURBOKS_ORDER_CREATE.url),
        method: uris.TOURBOKS_ORDER_CREATE.method,
        body: params
    };
    apiUtils.tourBoksRequest(options, cb);

};

exports.tourBoksSuccessCall = function (orderId, params, cb) {
    var options = {
        url: linkManager.getTourBoksApiUrl(uris.TOURBOKS_SUCCESS_CALL.url, {'orderId' : orderId}),
        method: uris.TOURBOKS_SUCCESS_CALL.method,
        body:params
    };
    apiUtils.tourBoksRequest(options, cb);
};

