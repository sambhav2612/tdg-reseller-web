/**
 * Created by Himanshu wolf on 09/11/15.
 */

var pageInfo = require('../constants/pageInfoConstants'),
    seoConstants = require('../constants/seoConstants'),
    reviewConstants = require('../constants/reviewConstants');
    // rentConstants = require('../constants/rentConstants');

exports.about = function(req, res) {
  res.tdgRender(pageInfo.ABOUT, null, {seo_data: seoConstants.ABOUT, result: reviewConstants.REVIEWS}, req,  res, true);
};

exports.terms = function(req, res) {
  res.tdgRender(pageInfo.TERMS, null, {seo_data: seoConstants.TERMS}, req,  res, true);
};

exports.faq = function(req, res) {
  res.tdgRender(pageInfo.FAQ, null, {seo_data: seoConstants.FAQ, result: reviewConstants.REVIEWS}, req,  res);
};

exports.login = function(req, res) {
  res.tdgRender(pageInfo.LOGIN, null, {seo_data: seoConstants.LOGIN, result: reviewConstants.REVIEWS}, req,  res, true);
};

exports.policies = function(req, res) {
  res.tdgRender(pageInfo.POLICIES, null, {seo_data: seoConstants.POLICIES}, req,  res, true);
};

exports.travelQuiz = function(req, res) {
  res.tdgRender(pageInfo.TRAVEL_QUIZ, null, {seo_data: seoConstants.TRAVEL_QUIZ}, req,  res);
};

exports.team = function(req, res) {
  res.tdgRender(pageInfo.TEAM, null, {seo_data: seoConstants.TEAM}, req,  res, true);
};

exports.event = function(req, res) {
  res.tdgRender(pageInfo.EVENT_PAGE, null, {seo_data: seoConstants.EVENT_PAGE}, req, res);
};
exports.travelAmigos = function(req, res) {
  res.tdgRender(pageInfo.TRAVEL_AMIGOS, null, {seo_data: seoConstants.TRAVEL_AMIGOS}, req, res);
};

exports.eventList = function(req, res) {
  res.tdgRender(pageInfo.EVENT_LIST, null, {seo_data: seoConstants.EVENT_LIST}, req,  res);
};
exports.contact = function(req, res) {
  res.tdgRender(pageInfo.CONTACT, null, {seo_data: seoConstants.CONTACT_US}, req,  res, true);
};

exports.whyChooseUs = function(req, res) {
  res.tdgRender(pageInfo.WHY_CHOOSE_US, null, {seo_data: seoConstants.WHY_CHOOSE_US, result: reviewConstants.REVIEWS}, req,  res);
};

exports.brandAmbassador = function(req, res) {
  res.tdgRender(pageInfo.BRAND_AMBASSADOR, null, {seo_data: seoConstants.BRAND_AMBASSADOR}, req,  res, true);
};

exports.corporateTours = function(req, res) {
  res.tdgRender(pageInfo.CORPORATE_TOURS, null, {seo_data: seoConstants.CORPORATE_TOURS}, req,  res);
};

exports.seller = function(req, res) {
  res.tdgRender(pageInfo.SELLER, null, {seo_data: seoConstants.SELLER}, req,  res, true);
};

exports.affiliate = function(req, res) {
  res.tdgRender(pageInfo.AFFILIATE, null, {seo_data: seoConstants.AFFILIATE}, req,  res, true);
};

exports.rentListing = function(req, res) {
  // res.tdgRender(pageInfo.RENT_LISTING, null, {seo_data: seoConstants.RENT_LIST, result: rentConstants.RENTAL_ITEMS}, req,  res);
};

exports.rent = function(req, res) {
  var item = req.params.slug;
  // res.tdgRender(pageInfo.RENT, null, {seo_data: seoConstants.RENT_ITEM, result: rentConstants.RENTAL_ITEMS[item]}, req,  res);
};

exports.career = function(req, res) {
  res.tdgRender(pageInfo.CAREER, null, {seo_data: seoConstants.CAREER}, req,  res, true);
};

