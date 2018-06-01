/**
 * Created by Himanshu wolf on 28/03/17.
 */

var async = require('async'),
    licenseService = require('../services/licenseService'),
    pageInfo = require('../constants/pageInfoConstants'),
    helper = require('../utils/helperUtils'),
    hasher = require('crypto'),
    SALT = 'e5K8X29ExH',
    KEY = 'X0LBo9Fo',
    PAYU_SECURE= 'https://secure.payu.in/_payment';


exports.getLicenseHome = function(req, res){

    var cb = function(err, data) {
            res.tdgRender(pageInfo.HOME, err, data, req, res);
        },
        domainName = req.params.domain_name;

    async.parallel([
        function(callback) {
            licenseService.getDomainDetail(domainName, callback);
        }, function(callback) {
            licenseService.getDomainProducts(domainName, callback);
         }, function(callback) {
            licenseService.getDomainPage(domainName, callback);
        }
    ], function(err, results) {
        if(!err){
            var data = results[0];
            data.result.products = results[1].result.products;
            data.result.pages = results[2].result.page;
            data.result.tags = {};
            data.result.products.forEach(function (product){
                product.tags = product.tags || [];
                for (var i=0; i<product.tags.length; i++){
                    if (product.tags[i].name in data.result.tags ){
                        data.result.tags[product.tags[i].name].push(product);
                    } else{
                        data.result.tags[product.tags[i].name] = [product];
                    }
                }
            });
        }
        cb(err, data)
    });
};

exports.getLicenseProductList = function(req, res){
    var cb = function(err, data) {
            res.tdgRender(pageInfo.LICENSE_PRODUCT_LIST, err, data, req, res);
        },
        domainName = req.params.domain_name,
        product_slug = req.params.product_slug;

    async.parallel([
        function(callback) {
            licenseService.getDomainProducts(domainName, callback);
        }, function(callback) {
            licenseService.getDomainDetail(domainName, callback);
        }, function(callback) {
            licenseService.getDomainPage(domainName, callback);
        }
    ], function(err, results) {
        if(!err){
            var data = results[0];
            data.result.licensee = results[1].result.licensee;
            data.result.pages = results[2].result.page;
        }
        cb(err, data)
    });
};

exports.getLicenseProduct = function(req, res){
    var cb = function(err, data) {
        res.tdgRender(pageInfo.LICENSE_PRODUCT, err, data, req, res);
        },
    domainName = req.params.domain_name,
    product_slug = req.params.product_slug;

    async.parallel([
        function(callback) {
            licenseService.getLicenseeProduct(domainName, product_slug, callback);
        }, function(callback) {
            licenseService.getDomainDetail(domainName, callback);
        }, function(callback) {
            licenseService.getDomainPage(domainName, callback);
        }
    ], function(err, results) {
        if(!err){
            var data = results[0];
            data.result.licensee = results[1].result.licensee;
            data.result.pages = results[2].result.page;
        }
        cb(err, data)
    });
};

exports.getLicensePage = function(req, res){
    var cb = function(err, data) {
            res.tdgRender(pageInfo.LICENSE_PAGE, err, data, req, res);
        },
        domainName = req.params.domain_name,
        page_slug = req.params.page_slug;
    async.parallel([
        function(callback) {
            licenseService.getLicenseePage(domainName, page_slug, callback);
        }, function(callback) {
            licenseService.getDomainDetail(domainName, callback);
        }, function(callback) {
            licenseService.getDomainPage(domainName, callback);
        }
    ], function(err, results) {
        if(!err){
            var data = results[0];
            data.result.licensee = results[1].result.licensee;
            data.result.pages = results[2].result.page;
        }
        cb(err, data)
    });
}
