/**
 * Created by Himanshu wolf on 10/05/16.
 */

var async = require('async'),
    securityUtils = require('../utils/securityUtils'),
    productService = require('../services/productService'),
    userService = require('../services/userService'),
    // destService = require('../services/destinationService'),
    reviewService = require('../services/reviewService'),
    pageConstants = require('../constants/pageInfoConstants'),
    productConstants = require('../constants/productConstants'),
    seoConstants = require('../constants/seoConstants');

    //refererParser = require('referer-parser'),
    //conversion = require("phantom-html-to-pdf")();

var productSearchMap = {
  'bus' : productService.getBusListing,
  'flight' : productService.getFlightListing
}
var productSearchResult = {
  'bus' : 'templates/busListing',
  'flight' : 'templates/flightListing'
}


exports.productList = function(req, res, next) {
  var cb = function(err, data) {
    data.seo_data = seoConstants.PRODUCT_LISTING;
    res.tdgRender(pageConstants.PRODUCT_LIST, err, data, req, res, true);
  }
};

exports.loadTours = function(req, res) {
  var location = req.query.location;
  var cb = function(err, data) {
    res.tdgRender({view: 'templates/productListing', do_ab_test : false}, err, data, req, res);
  }
  if(location){
    productService.getPlansForLocation(location, cb) // 0 for plans
  } else {
    productService.getPlans(productConstants.PLANS, cb); //0 = plans
  }

};

exports.tripListing = function(req, res) {
  var cb = function(err, data) {
    data.seo_data = seoConstants.TRIP_LISTING;
    res.tdgRender(pageConstants.TRIP_LIST, err, data, req, res);
  }

  async.parallel([
    function(callback) {
      productService.getPlans(productConstants.TRIPS, callback); //1 = trips
    }, function(callback) {
      productService.getPlans(productConstants.PLANS ,callback); //0 = plans
    }
  ], function(err, results) {
    if (!err) {
      var data = results[1];

      data.result.trips = results[0].result.plans;
    }
    cb(err, data)
  });
}

exports.productPage = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender(pageConstants.PRODUCT_PAGE, err, data, req, res, true);
  }
  var product_slug = req.params.product_name;
  productService.getPlanProduct(product_slug, productConstants.PLANS, cb); //0 = plans


  // async.parallel([
  //   function(callback) {
  //     productService.getPlanProduct(product_slug, productConstants.PLANS, callback); //0 = plans
  //   }, function(callback) {
  //     userService.facebookReviews(callback);
  //   }
  // ], function(err, results) {
  //   if (!err) {
  //     var data = results[0];
  //     data.result.reviews = results[1].data;
  //   }
  //   cb(err, data)
  //
  // });
};

exports.tripPage = function(req, res) {

  var cb = function(err, data) {
    res.tdgRender(pageConstants.TRIP_PAGE, err, data, req, res, true);
  }
  var product_slug = req.params.slug;
  productService.getPlanProduct(product_slug, productConstants.TRIPS, cb); //1 = trips
};

exports.requestProductBooking = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };

  
  productService.requestBooking(req.body, cb);
};
exports.requestLicenseBooking = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  productService.requestBookingQuery(req.body, cb);
};
exports.searchProduct = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({view: productSearchResult[req.params.product_type], do_ab_test : false}, err, data, req, res);
  };
  productSearchMap[req.params.product_type](req.query, cb);
}

exports.searchStay = function(req, res) {
  var stay_id = req.query.stay, location = req.query.location || 'kasol',
      view = stay_id ? pageConstants.STAY_PAGE : pageConstants.STAY_SEARCH,
     cb = function(err, data) {
    res.tdgRender(view, err, data, req, res, true);
  };
  if(stay_id){
    productService.getStayProduct(stay_id, cb);
  } else {
    // var p1 = destService.getDestinationData(location, 'stay');
    // // var p2 = destService.getLocationStays(location);
    // console.log(p1);
    // Promise.all([p1]).then(function(err, results) {
    //   if(!err){
    //     var data = results[0];
    //     data.result.stays = results[1].result.stays;
    //   }
    //   res.tdgRender({view: productSearchResult[req.params.product_type], do_ab_test : false}, err, data, req, res);
    // }).catch(function () {
    //       console.log("Connection Issues");
    // });

    async.parallel([
      function(callback) {
        // destService.getDestinationData(location, 'stay', callback);
      }, function(callback) {
        // destService.getLocationStays(location, callback);
      }

    ], function(err, results) {
      if(!err){
        var data = results[0];
        data.result.stays = results[1].result.stays;
      }
      cb(err, data)
    });
  }
};

exports.getDeal = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  productService.getPricing(req.body, cb)
};

exports.stayDeal = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  var dealObject = req.body, rooms = JSON.parse(req.body.rooms), roomFetchMethods = [];

  for(var i=0; i < rooms.length; i+=1) {
    dealObject.product_id = rooms[i];
    roomFetchMethods.push(function(callback) {
      productService.getRoomPricing(dealObject, callback)
    });
  }

  async.parallel(roomFetchMethods, function(err, results) {
    cb(err, results)
  });
  productService.getPricing(req.body, cb)
};



exports.getGroupDeal = function(req, res) {
  var cb = function(err, data) {
    res.tdgRender({}, err, data, req, res);
  };
  productService.getGroupPricing(req.body, cb)
};

exports.getDepartures = function(req, res) {
  var plan_id = req.query.plan;
  var cb = function(err, data) {
  	if(data.result.dates.length){
  	//console.log(data);  
    res.render("templates/dateWrapper", data );
	}
  };

  productService.getDepartures(plan_id, cb)
}

exports.review = function(req, res) {
  var operator = req.query.operator;
  var cb = function(err, data) {
    if(!operator){
      res.status(404);
      res.tdgRender({view:'404'}, null, {}, req,  res);
    }else{
      res.tdgRender(pageConstants.REVIEW, err, data, req, res, true);
    }
  };

  var product_slug = req.params.product_name;
  async.parallel([
    function(callback) {
      productService.getPlanProduct(product_slug, productConstants.PLANS, callback)
    }, function(callback) {
      reviewService.ratingType(callback);
    }

  ], function(err, results) {
    if(!err){
      var data = results[0];
      data.result.ratings = results[1].result.types;
      if(operator){
        data.result.plan.vendors.forEach(function (s) {
          if(s.code === operator){
            data.result.vendor = s;
          }
        });
      }
    }
    cb(err, data)
  });

};

// post reviews for a product

exports.postReview = function(req, res) {
  var reviewInfo = req.body;

  var cb = function(err, data) {
      res.tdgRender({}, err, data, req, res);
  };
  if(reviewInfo.rating){
    reviewService.saveRating(reviewInfo , cb)
  }else{
    reviewService.saveReview(reviewInfo , cb)
  }

};

exports.putReview = function(req, res) {
  var reviewInfo = req.body;

  var cb = function(err, data) {
      res.tdgRender({}, err, data, req, res);
  };
  if(reviewInfo.rating){
    reviewService.updateRating(reviewInfo , cb)
  }else{
    // productService.saveReview(reviewInfo , cb)
  }

};


// get all reviews for a product

exports.reviews = function(req, res) {
  var cb = function(err, data) {
    // getreviewRatingData(data.results.plans);
    res.tdgRender(pageConstants.REVIEWS, err, data, req, res);
  };

  var product_slug = req.params.product_name;
  productService.getPlanProduct(product_slug, productConstants.PLANS, cb)
 };

//
//exports.getTravelGuide = function(req, res) {
//  conversion({ numberOfWorkers: 2,
//    url: req.query.url,
//    fitToPage: true, //whether to set zoom if contents don't fit on the page
//    injectJs: [], // injects javascript files in the page
//    settings: {
//      javascriptEnabled : true
//    },
//    viewportSize: {
//      width: 1200,
//      height: 900
//    },
//    format: {
//      quality: 100
//    }
//  }, function(err, pdf) {
//    pdf.stream.pipe(res);
//  });
//}


