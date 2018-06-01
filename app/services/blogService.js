/**
 * Created by Himanshu wolf on 06/02/16.
 */

var linkManager = require('../utils/LinkManager'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils'),
    config = require('../appConfig'),
    DEFAULT_PAGE_SIZE = 20;

exports.blogListing = function(page, cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.BLOG_LIST.url, {page:page, page_size: DEFAULT_PAGE_SIZE}),
    method: uris.BLOG_LIST.method
  }
  apiUtils.httpRequest(options, cb);
};

exports.blogCategoryListing = function(category, page, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.BLOG_CATEGORY_LIST.url, {category_slug: category}, {page: page, page_size: DEFAULT_PAGE_SIZE}),
    method: uris.BLOG_CATEGORY_LIST.method
  }
  apiUtils.httpRequest(options, cb);
};


exports.blogContent = function(blog_slug, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.BLOG_PAGE.url, {blog_slug:blog_slug}),
    method: uris.BLOG_PAGE.method
  }
  apiUtils.httpRequest(options, cb);
};



exports.blogDraftList = function(cb) {
  var options = {
    url: linkManager.getApiUrl(uris.BLOG_DRAFT_LIST.url),
    method: uris.BLOG_DRAFT_LIST.method
  }
  apiUtils.httpRequest(options, cb);
};

exports.blogDraft = function(blog_slug, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.BLOG_DRAFT.url, {blog_slug:blog_slug}),
    method: uris.BLOG_DRAFT.method
  }
  apiUtils.httpRequest(options, cb);
};

exports.addBlog = function(content, user, cb) {
  content.author = user.id;

  var options = {
    url: linkManager.getApiUrl(uris.BLOG_LIST.url),
    method: 'POST',
    body: content
  }
  apiUtils.httpRequest(options, cb);
}
exports.updateBlog = function(blog_slug, content, user, cb) {
  content.author = user.id;

  var options = {
    url: linkManager.getApiUrl(uris.BLOG_PAGE.url, {blog_slug:blog_slug}),
    method: 'PUT',
    body: content
  }
  apiUtils.httpRequest(options, cb);
}