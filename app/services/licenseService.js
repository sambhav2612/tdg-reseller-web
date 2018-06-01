/**
 * Created by Himanshu wolf on 28/03/17.
 */


var linkManager = require('../utils/LinkManager'),
    config = require('../appConfig'),
    moment = require('moment'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils');

var DEFAULT_THEME = 'themedelight';

exports.getDomainDetail = function(domain, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.DOMAIN_DATA.url, {domain: domain}),
        method: uris.DOMAIN_DATA.method
    };
    var getTheme = function(err, data) {
        if(err){
            cb(err)
        } else {
            data.result.licensee.theme =  data.result.licensee.theme || DEFAULT_THEME;
            //data.result.licensee.theme =  'themedelight'
            cb(null, data)
        }
    }
    apiUtils.httpRequest(options, getTheme);

};


exports.getDomainProducts = function(domain, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_PRODUCTS.url, {domain: domain}),
        method: uris.LICENSE_PRODUCTS.method
    };
    apiUtils.httpRequest(options, cb);

};

exports.getDomainPage = function(domain, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_PAGES.url, {domain: domain}),
        method: uris.LICENSE_PAGES.method
    };
    apiUtils.httpRequest(options, cb);

};

exports.getDomainBlog = function(domain, cb){

    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_BLOGS.url, {domain: domain}),
        method: uris.LICENSE_BLOGS.method
    };
    apiUtils.httpRequest(options, cb);
}


exports.getLicenseeProduct = function(domain, product, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_PRODUCT.url, {domain: domain, product_slug: product}),
        method: uris.DOMAIN_DATA.method
    };
    apiUtils.httpRequest(options, cb);

};

exports.getLicenseePage = function(domain, page, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_PAGE.url, {domain: domain, slug: page}),
        method: uris.LICENSE_PAGE.method
    };
    apiUtils.httpRequest(options, cb);

};


exports.getLicenseeBlog = function(domain, blog_slug, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_BLOG.url, {domain: domain, blog_slug: blog_slug}),
        method: uris.LICENSE_BLOG.method
    };
    apiUtils.httpRequest(options, cb);

};


exports.getLicenseeTag = function(domain, cb) {
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_TAG.url, {domain: domain}),
        method: uris.LICENSE_TAG.method
    };
    apiUtils.httpRequest(options, cb);

};
exports.createBooking = function(body, cb) {
    var params = body;
    params.licensee_id = parseInt(body.licensee_id);
    params.licensee_product = parseInt(body.licensee_product);
    params.is_booking = body.is_booking =='true'
    params.travellers = parseInt(body.travellers);
    params.offer_price = parseFloat(body.offer_price);
    params.advance = parseFloat(body.advance) || params.offer_price;
    params.start_date = moment(body.start_date, 'DD-MM-YYYY').valueOf()/1000;
    params.mobile = params.phone;
    params.name = params.firstname;
    params.total_price = params.offer_price*params.travellers;
    params.tax = Math.round(params.travellers*(0.05*params.offer_price));
    params.paid = 0;
    var options = {
        url: linkManager.getApiUrl(uris.LICENSE_BOOKING.url),
        method: uris.LICENSE_BOOKING.method,
        body: params
    };
    apiUtils.httpRequest(options, cb);
};