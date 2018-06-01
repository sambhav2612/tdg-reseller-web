/**
 * Created by Himanshu wolf on 06/02/16.
 */


var async = require('async'),
    blogService = require('../services/blogService'),
    licenseService = require('../services/licenseService'),
    pageConstants = require('../constants/pageInfoConstants'),
    seoConstants = require('../constants/seoConstants');

/**
 * @controller
 * @desc - function to control the blog listing page
 * @param req
 * @param res
 */
exports.getLicenseBlogs = function(req, res){
  var cb = function(err, data) {
        res.tdgRender(pageConstants.LICENSE_BLOGS, err, data, req, res);
      },
      domainName = req.params.domain_name;
  async.parallel([
    function(callback) {
      licenseService.getDomainBlog(domainName, callback);
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


/**
 * @controller
 * @desc - function to control the blog post page
 * @param req
 * @param res
 */
exports.getLicenseBlog = function(req, res){
  var cb = function(err, data) {
        res.tdgRender(pageConstants.LICENSE_BLOG, err, data, req, res);
      },
      domainName = req.params.domain_name,
      blog_slug = req.params.blog_slug;
  async.parallel([
    function(callback) {
      licenseService.getLicenseeBlog(domainName, blog_slug, callback);
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