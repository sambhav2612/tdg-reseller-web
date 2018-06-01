var uriTemplate = require('uritemplate'),
    routesConstants = require('../constants/routesConstants'),
    appConfig = require('../appConfig'),
    _ = require('underscore'),
    appConstants = require('../constants/appConstants');

exports.getApiUrl = function(URI,params, queryParam){
  return (getURL(appConfig.api.url+URI, params) +  makeQueryParam(queryParam));
};

exports.getWebUrl = function(URI,params){
  return getURL(appConfig.web.url+URI, params)
};

exports.getApiUrlQuery = function(URI, queryParam) {
  return (appConfig.api.url+URI +  makeQueryParam(queryParam));
};

exports.getTDGApiUrl = function(URI, params,queryParam) {
  return (getURL(appConfig.api.tdg_api + URI, params) +  makeQueryParam(queryParam));
};

exports.getPaymentApiUrlQuery = function(URI, queryParam) {
  return (getURL(appConfig.api.tdg_url+URI, params) +  makeQueryParam(queryParam));
};

exports.getForeignApiUrl = function(URI,params, queryParam){
  return(getURL(URI, params) +  makeQueryParam(queryParam));
};

exports.getTourBoksApiUrl = function(URI,params, queryParam) {
  return (getURL(appConfig.tourboks_api.URL+URI, params) + makeQueryParam(queryParam));

};


var makeQueryParam = function(queryParamMap) {
    var string = '?', paramList, index;
    if(queryParamMap) {
      for(var key in queryParamMap) {
        if(queryParamMap[key].constructor === Array) {
          paramList = queryParamMap[key];
          index = paramList.length;
          while(index) {
            index -=1;
            string += key + '[]=' +paramList[index] + '&';
          }
        } else {
          string += key + '=' +queryParamMap[key] + '&';
        }
      }
    }
    return(string);
};
var getURL = function(url,params){
  if (params != null && typeof params == 'object'){
    return (uriTemplate.parse(url).expand(params));
  } else {
    return(url);
  }
};

