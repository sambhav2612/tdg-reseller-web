/**
 * Created by Himanshu wolf on 28/03/17.
 */

var async = require('async'),
    licenseService = require('../services/licenseService'),
    eventService = require('../services/eventService'),
    pageInfo = require('../constants/pageInfoConstants'),
    helper = require('../utils/helperUtils');


exports.getLicenseEventList = function(req, res){

    var cb = function(err, data) {
            res.tdgRender(pageInfo.EVENT_LIST, err, data, req, res);
        },
        domainName = req.params.domain_name;

    async.parallel([
        function(callback) {
            eventService.getEventList(domainName, callback);
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

exports.getLicenseEvent = function(req, res){

    var cb = function(err, data) {
            res.tdgRender(pageInfo.EVENT_PAGE, err, data, req, res);
        },
        domainName = req.params.domain_name,
        event_slug = req.params.event_slug;

    async.parallel([
        function(callback) {
            eventService.getEvent(domainName, event_slug, callback);
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
            //data.result.blogs = results[3].result.blogs;

        }
        cb(err, data)
    });
};
