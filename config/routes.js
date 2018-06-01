var urlConst = require('../app/constants/routesConstants'),
    securityUtils = require('../app/utils/securityUtils'),
    logger = require('../app/utils/loggingUtils'),
    homeController = require('../app/controllers/homeController'),
    // destinationController = require('../app/controllers/destinationController'),
    routeController = require('../app/controllers/routeController'),
    blogController = require('../app/controllers/blogController'),
    productController = require('../app/controllers/productController'),
    checkoutController = require('../app/controllers/checkoutController'),
    explorerController = require('../app/controllers/explorerController'),
    itineraryController = require('../app/controllers/itineraryController'),
    staticController = require('../app/controllers/staticController'),
    userController = require('../app/controllers/userController'),
    sitemapController = require('../app/controllers/sitemapController'),
    licenseController = require('../app/controllers/licenseController'),
    eventController = require('../app/controllers/eventController'),
    errorController = require('../app/controllers/errorController'),
    affiliateController = require('../app/controllers/affiliateController'),
    distributionController = require('../app/controllers/distributionController');

module.exports = function(app, passport){

  app.get('/health',function(req,res){
    res.render('hello')
  });

  app.get(urlConst.WEB.LANDING_URL,homeController.home);

  app.get(urlConst.WEB.TERMS,staticController.terms);
  app.get(urlConst.WEB.FAQ,staticController.faq);
  app.get(urlConst.WEB.POLICIES,staticController.policies);
  app.get(urlConst.WEB.TEAM,staticController.team);

  app.get(urlConst.WEB.SITEMAP, sitemapController.sitemap);

  app.get(urlConst.WEB.COLLECTION, explorerController.getCollections);
  app.get(urlConst.WEB.COLLECTION_ITEMS, explorerController.collectionItems);
  app.get(urlConst.WEB.SPECIAL_THINGS_TO_DO, explorerController.activityCollection);
  app.get(urlConst.WEB.SPECIAL_THINGS_TO_DO_ITEMS, explorerController.activityCollectionItems);
  app.get(urlConst.WEB.EXPLORE, explorerController.openExplorer);
  app.get(urlConst.WEB.EXPLORE_FILTER, explorerController.filterExplorer);


  app.get(urlConst.WEB.USER_PROFILE, userController.profile);
  app.get(urlConst.WEB.LOGOUT, userController.logout);

  app.get(urlConst.LICENSE.GET_BLOGS,blogController.getLicenseBlogs);
  app.get(urlConst.LICENSE.GET_BLOG,blogController.getLicenseBlog);

  app.get(urlConst.WEB.PRODUCT_LISTING, productController.productList);

  app.get(urlConst.WEB.PRODUCT_LISTING_1, function(req, res) {
    res.redirect('/tour')
  });
  app.get(urlConst.WEB.PRODUCT_LISTING_2, function(req, res) {
    res.redirect('/tour')
  });

  app.get(urlConst.WEB.PRODUCT, productController.productPage);
  app.get(urlConst.WEB.PRODUCT_1, function(req, res) {
    res.redirect('/tour/' + req.params.product_name)
  });
  app.get(urlConst.WEB.PRODUCT_2, function(req, res) {
    res.redirect('/tour/' + req.params.product_name)
  });

  app.get(urlConst.WEB.PRODUCT_REVIEW, productController.review);
  app.post(urlConst.WEB.PRODUCT_REVIEW, productController.postReview);
  app.put(urlConst.WEB.PRODUCT_REVIEW, productController.putReview);
  app.get(urlConst.WEB.PRODUCT_REVIEWS, productController.reviews);

  app.get(urlConst.WEB.STAY, productController.searchStay);
  // app.get(urlConst.WEB.HOSTING,vendorController.hostingPlans);

  app.get(urlConst.WEB.FIND_ROUTES,routeController.findRoutes);
  app.get(urlConst.WEB.CAB_SEARCH,routeController.findCabs);

  app.get(urlConst.WEB.CUSTOM_BOOKING, checkoutController.customPay);
  app.post(urlConst.WEB.CUSTOM_BOOKING, checkoutController.customPayment);

  app.post(urlConst.LICENSE.ADD_PRODUCT,checkoutController.addToBooking);
  app.get(urlConst.LICENSE.CUSTOM_PAY,checkoutController.customPay);
  app.get(urlConst.LICENSE.BOOKING,checkoutController.bookingPage);
  app.post(urlConst.LICENSE.BOOKING,checkoutController.createBooking);
  app.post(urlConst.LICENSE.BOOKING_FAILURE,checkoutController.bookingFailure);
  app.post(urlConst.LICENSE.BOOKING_SUCCESS,checkoutController.bookingSuccess);


  /**
   * Licensee
   */

  app.get(urlConst.LICENSE.HOME,licenseController.getLicenseHome);
  app.get(urlConst.LICENSE.PRODUCT,licenseController.getLicenseProduct);
  app.get(urlConst.LICENSE.GET_TOURS,licenseController.getLicenseProductList);
  app.get(urlConst.LICENSE.GET_EVENTS,eventController.getLicenseEventList);
  app.get(urlConst.LICENSE.EVENT_PAGE,eventController.getLicenseEvent);
  app.get(urlConst.LICENSE.GET_DEPARTURES, productController.getDepartures);
  app.post(urlConst.LICENSE.PRODUCT_QUERY, productController.requestProductBooking);
  app.post(urlConst.LICENSE.QUERY, productController.requestLicenseBooking);
  app.get(urlConst.LICENSE.STATIC_PAGE, licenseController.getLicensePage);
  app.post(urlConst.LICENSE.BOOKING, checkoutController.createBooking);

  /**
   * API routes
   */
  // app.post(urlConst.API.ADD_TO_WISHLIST, function(req, res, next) {
  //   if(req.user_session.user){
  //     next();
  //   } else {
  //     res.redirect(urlConst.WEB.FACEBOOK_LOGIN);
  //   }
  // });

  app.get(urlConst.WEB.FACEBOOK_LOGIN, function(req, res) {
    req.session.returnUrl = req.query.returnUrl || req.session.returnUrl;
    passport.authenticate('facebook', {scope : 'email'})(req,res);
  });
  app.get(urlConst.WEB.FACEBOOK_LOGIN_REPEAT, function(req, res) {
    passport.authenticate('facebook', {
      scope: ['email'],
      authType: 'rerequest' // this is important
    })(req, res);
  })

  app.get(urlConst.WEB.FACEBOOK_LOGIN_CB, function(req, res, next) {
      passport.authenticate('facebook', { failureRedirect: '/' },
      function (err, user, info) {
        if (err) {
          if (err == 'email-required') res.redirect(urlConst.WEB.FACEBOOK_LOGIN_REPEAT);
          // check for other kinds of errors and show proper messages
          return;
        }
        req.user = user;
        if(req.isAuthenticated()) {
          req.user_session.user = req.user.result.user;
          res.redirect(req.session.returnUrl || urlConst.WEB.LANDING_URL);
          console.log("yo baby facebook login success");
        } else {
          res.send("sorry something failed");
        }
      })(req, res, next);

      //function(req, res) {
      //  if(req.isAuthenticated()) {
      //    req.user_session.user = req.user.result.user;
      //    res.redirect(req.session.returnUrl || urlConst.WEB.LANDING_URL);
      //    console.log("yo baby facebook login success");
      //
      //  } else {
      //    res.send("sorry something failed");
      //  }

  });

  app.get(urlConst.WEB.GOOGLE_LOGIN, function(req, res) {
    req.session.returnUrl = req.query.returnUrl || req.session.returnUrl;
    passport.authenticate('google')(req,res);
  });

  app.get(urlConst.WEB.GOOGLE_LOGIN_CB, function(req, res, next) {
    passport.authenticate('google', { failureRedirect: '/' },
        function (err, user, info) {
          req.user = user;
          if(req.isAuthenticated()) {
            req.user_session.user = req.user.result.user;
            res.redirect(req.session.returnUrl || urlConst.WEB.LANDING_URL);
            console.log(" google login success");
          } else {
            res.send("sorry something failed");
          }
        })(req, res, next);

    //function(req, res) {
    //  if(req.isAuthenticated()) {
    //    req.user_session.user = req.user.result.user;
    //    res.redirect(req.session.returnUrl || urlConst.WEB.LANDING_URL);
    //    console.log("yo baby facebook login success");
    //
    //  } else {
    //    res.send("sorry something failed");
    //  }

  });

  //checkout controllers
  app.post(urlConst.API.SUBSCRIBE, homeController.subscribe);
  app.post(urlConst.API.GET_QUOTE, itineraryController.getQuote);
  app.post(urlConst.API.PRODUCT_BOOKING, productController.requestProductBooking);
  app.post(urlConst.API.BOOK_TRIP, productController.requestProductBooking);
  app.post(urlConst.API.ADD_TO_BOOK, checkoutController.addToBooking);
  app.put(urlConst.API.GET_QUOTE, itineraryController.updateQuote);
  // app.get(urlConst.API.GET_WEATHER, destinationController.getWeather);
  // app.get(urlConst.API.WEEKLY_DESTINATION, homeController.weeklyDestination);
  // app.get(urlConst.API.HOME_FACT, homeController.homeFact);
  // app.get(urlConst.API.LOAD_TOURS, productController.loadTours);
  // app.post(urlConst.API.GET_DEAL, productController.getDeal);
  //app.post(urlConst.API.GET_PRICE_DEAL, productController.getGroupDeal);
  //app.get(urlConst.API.GET_GUIDE, productController.getTravelGuide);

  // app.get(urlConst.API.AUTO_SEARCH, destinationController.autoSearch);
  // app.get(urlConst.API.ITEM_SEARCH, productController.searchProduct);

  app.get(urlConst.API.EMAIL_TRACK, userController.emailTrack);
  // app.post(urlConst.API.INTENT_RESPONSE, userController.exitResponse);

  app.post(urlConst.API.GENERATE_PROD_DIST, distributionController.getProductDist);


  //tourBoks API controllers
  // app.get(urlConst.TOURBOKS_API.SEARCH, affiliateController.productSearch);
  // app.get(urlConst.TOURBOKS_API.PRODUCT_ID, affiliateController.productDetails);
  // app.get(urlConst.TOURBOKS_API.AVAILABLE_DATES, affiliateController.availableDates);
  // app.get(urlConst.TOURBOKS_API.AVAILABILITY, affiliateController.confirmedTimeslot);
  // app.get(urlConst.TOURBOKS_API.CREATE, affiliateController.createOrder);
  // app.get(urlConst.TOURBOKS_API.BOOKING_SUCCESS, affiliateController.bookingSuccessCall);

  app.all('*', errorController._404);


};