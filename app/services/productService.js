/**
 * Created by Himanshu wolf on 31/05/16.
 */

var async = require('async'),
    linkManager = require('../utils/LinkManager'),
    config = require('../appConfig'),
    moment = require('moment'),
    uris = require('../constants/urlTemplates'),
    apiUtils = require('../utils/APIUtils'),
    PLANS_CONSTANTS = {
      'Trip' : 'trip',
      'Plan' : 'tour'
    },
    DEFAULT_PAGE_SIZE = 50;

var parseProductListing = function(result)  {
  var plans = result.plans, priceModel = {"Under ₹2000":0, "₹2000 - ₹5000":0, "Above ₹5000":0},
  locationModel = {}, token, topPlans = [];

  for(var i=0;i<plans.length; i++){
    token = plans[i];

    token.url = '/'+ PLANS_CONSTANTS[token.model] + '/' + token.slug;

    if(i<3)
      topPlans.push(token);

    if(token.offer_price>5000)
      priceModel["Above ₹5000"] += 1;
    else if(token.offer_price>2000)
      priceModel["₹2000 - ₹5000"] +=1;
    else
      priceModel["Under ₹2000"] +=1;

    if(locationModel[token.location.name])
      locationModel[token.location.name] +=1;
    else
      locationModel[token.location.name] =1
  }

  result.topPlans = topPlans;
  result.priceModel = priceModel;
  result.locationModel = locationModel;

  return result;
}

var parseProductURL = function(result)  {
  var plans = result.plans, token;

  for(var i=0;i<plans.length; i++){
    token = plans[i];
    token.url = '/'+ PLANS_CONSTANTS[token.model] + '/' + token.slug;
  }
  return result;
}

//@required function
exports.getDepartures = function(plan_id, cb) {
  var options = {
    url: linkManager.getTDGApiUrl(uris.DEPARTURES.url, {plan: plan_id}),
    method: uris.DEPARTURES.method
  }
  apiUtils.httpRequest(options, cb);
}

exports.getFilteredPlans = function(query, cb) {
  var options = {
        url: linkManager.getApiUrlQuery(uris.PLAN.url, query),
        method: uris.PLAN.method
      },
      parseResults= function(err, data) {
        if(!err){
          data.result = parseProductListing(data.result);
        }
        cb(err, data)
      }
  apiUtils.httpRequest(options, parseResults);
};

exports.getCouponsApplied = function(code, cb) {
  var options ={
    url: linkManager.getApiUrlQuery(uris.CHECK_OFFER.url, {code: code}),
    method: uris.CHECK_OFFER.method
  };

  apiUtils.httpRequest(options, cb)
};


exports.getPlans = function(plan_type, cb) {
  var options = {
        url: linkManager.getApiUrlQuery(uris.PLAN.url, {model:plan_type}),
        method: uris.PLAN.method
      },
      parseResults= function(err, data) {
        if(!err){
          data.result = parseProductListing(data.result);
        }
        cb(err, data)
      }
  apiUtils.httpRequest(options, parseResults);
};

exports.getAllTours = function(page, cb) {
  var options = {
        url: linkManager.getApiUrlQuery(uris.PLAN.url, {page:page, page_size: DEFAULT_PAGE_SIZE}),
        method: uris.PLAN.method
      },
      parseResults= function(err, data) {
        if(!err){
          data.result = parseProductListing(data.result);
        }
        cb(err, data)
      }
  apiUtils.httpRequest(options, parseResults);
};


exports.getActivityPlans = function(activity_slug, cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.ACTIVITY_PLAN.url, {activity_slug: activity_slug}),
    method: uris.ACTIVITY_PLAN.method
  };
  apiUtils.httpRequest(options, cb);
};


exports.getPlanProduct = function(product_slug, plan_type, cb) {
  var options = {
    url : linkManager.getApiUrl(uris.PLAN_PRODUCT.url, {plan_slug: product_slug}, {model: plan_type}),
    method: uris.PLAN_PRODUCT.method
  },
      parseResults= function(err, data) {
        if(!err){
          data.result.plan.url = '/'+ PLANS_CONSTANTS[data.result.plan.model] + '/' + data.result.plan.slug;
        }
        cb(err, data)
      }
  apiUtils.httpRequest(options, parseResults);
};


exports.getStayProduct = function(product_slug, cb) {
  var options = {
    url: linkManager.getApiUrl(uris.STAY_PRODUCT.url, {stay_slug: product_slug}),
    method: uris.STAY_PRODUCT.method
  }
  apiUtils.httpRequest(options, cb);
};


exports.getPlansForLocation = function(location_slug, cb) {
  var options = {
    url: linkManager.getApiUrlQuery(uris.PLAN.url, {location_slug : location_slug}),
    method: uris.PLAN.method
  },
      parseResults= function(err, data) {
        if(!err){
          data.result = parseProductURL(data.result);
        }
        cb(err, data)
      }
  apiUtils.httpRequest(options, parseResults);
}

exports.requestBooking = function(body, cb) {
  var params = body;

  if(body.start_date) {
    params.start_date = new Date(body.start_date);
  } else {
    delete(params.start_date);
  }
  params.travel_time = parseFloat(body.travel_time);
  params.budget = parseFloat(body.budget);


  var options = {
    url: linkManager.getApiUrl(uris.PRODUCT_BOOKING.url),
    method: uris.PRODUCT_BOOKING.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
}
exports.requestBookingQuery = function(body, cb) {
  var params = body;
  params.is_booking = body.is_booking =='true'

  if(body.start_date) {
    params.start_date = new Date(body.start_date);
  } else {
    delete(params.start_date);
  }
  // params.travel_time = parseFloat(body.travel_time);
  // params.budget = parseFloat(body.budget);


  var options = {
    url: linkManager.getApiUrl(uris.LICENSE_BOOKING.url),
    method: uris.LICENSE_BOOKING.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
}
exports.createBooking = function(body, cb) {
  var params = body;

  if(!params.offer){
    delete params.offer;
  }

  params.booking_date = moment().format('YYYY-MM-DD HH:mm:ss');
  params.travel_date = (moment(params.start_date, "DD-MM-YYYY").valueOf()/1000)+19800;
  params.travellers = parseInt(body.travellers);
  params.offer_price = parseFloat(body.price);
  params.source_id = 9;
  params.payment_method = 1;
  params.gateway_id = 1;  //gateway id for payumoney


  var options = {
    url: linkManager.getPaymentApiUrlQuery(uris.CREATE_BOOKING.url),
    method: uris.CREATE_BOOKING.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
}

exports.mgBooking = function(body, cb) {
  var params = body;

  params.is_paid = body.is_paid ? body.is_paid : false;
  params.coupon_code = body.coupon_code;
  params.travellers = parseInt(body.travellers);
  params.price = parseFloat(body.price);
  params.advance = parseFloat(body.price);


  var options = {
    url: linkManager.getApiUrl(uris.PRODUCT_BOOKING.url),
    method: uris.PRODUCT_BOOKING.method,
    body: params
  };
  apiUtils.httpRequest(options, cb);
}

exports.getFlightListing = function(params, cb) {
  params.app_id = config.foreign_api.GOKARDE.appID;
  params.app_key = config.foreign_api.GOKARDE.appKEY;

  var options = {
    url: linkManager.getForeignApiUrl(uris.FLIGHT.url, {}, params),
    method: uris.FLIGHT.method
  }
  apiUtils.httpRequest(options, cb);
};

exports.getBusListing = function(params, cb) {
  params.app_id = config.foreign_api.GOKARDE.appID;
  params.app_key = config.foreign_api.GOKARDE.appKEY;
  var options = {
    url: linkManager.getForeignApiUrl(uris.BUS.url, {}, params),
    method: uris.BUS.method
  }
  apiUtils.httpRequest(options, cb);
};

exports.getPricing = function(params, cb) {
  params.travel_date = (moment(params.start_date, "DD-MM-YYYY").valueOf()/1000)+19800;

  var promiseList = [];

  var getDynamicPricing = function(err, data) {
    if(err || !data.result.prices.length){
      cb(err, data)
    } else {
      for (var index in data.result.prices) {
        var options_CB = {
          url: linkManager.getPaymentApiUrlQuery(uris.DYNAMIC_PRICE.url, JSON.parse(JSON.stringify({ travel_date: params.travel_date,  price_id: data.result.prices[index].id}))),
          method: uris.DYNAMIC_PRICE.method
        };
        (function(options_in) {
          promiseList.push(function (callback) {
            apiUtils.httpRequest(options_in, callback);
          });
        })(options_CB);

      }
      async.parallel(promiseList, function (err, results) {
        if (!err && results[0].result.price.min_price) {
          for (var index in data.result.prices) {
            if (results[index].result.price.min_price) {
              data.result.prices[index].offer_price = results[index].result.price.min_price;
            }
          }
        }
        cb(null, data)
      });
    }
  }

  var options = {
    url: linkManager.getPaymentApiUrlQuery(uris.FETCH_PRICE.url, params),
    method: uris.FETCH_PRICE.method
  }
  apiUtils.httpRequest(options, getDynamicPricing);
};

exports.getRoomPricing = function(params, cb) {
  params.start_date = moment(params.checkin, "DD-MM-YYYY").format('YYYY-MM-DD HH:mm:ss');
  var options = {
    url: linkManager.getPaymentApiUrlQuery(uris.FETCH_PRICE.url, params),
    method: uris.FETCH_PRICE.method
  }
  apiUtils.httpRequest(options, cb);
};

exports.getGroupPricing = function(params, cb) {
  var options = {
    url: linkManager.getPaymentApiUrlQuery(uris.GROUP_PRICE.url, params),
    method: uris.GROUP_PRICE.method
  }
  apiUtils.httpRequest(options, cb);
};



