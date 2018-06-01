var checkoutService = require('../services/checkoutService'),
    licenseService = require('../services/licenseService'),
    eventService = require('../services/eventService'),
    hasher = require('crypto'),
    async = require('async'),
    _ = require('underscore'),
    config = require('../appConfig'),
    productService = require('../services/productService'),
    pageConstants = require('../constants/pageInfoConstants'),
// transportUtils = require('../utils/transportUtils'),
    helper = require('../utils/helperUtils'),
    SALT = 'e5K8X29ExH',
    KEY = 'X0LBo9Fo',
    PAYU_SECURE = 'https://secure.payu.in/_payment';


//Checkout Flow

exports.addToBooking = function (req, res) {
  req.session.product_id = req.body.product;
  req.session.is_tour = req.body.is_tour;
  res.tdgRender({}, null, {result: 'Item ready for booking'}, req, res);
};

exports.bookingPage = function (req, res) {
  var cb = '', domainName = req.params.domain_name;
  var product = req.session.product_id;

  if (product) {
    cb = function (err, data) {
      res.tdgRender(pageConstants.LICENSE_BOOKING, null, data, req, res);
    };

    async.parallel([
      function (callback) {
        if (req.session.is_tour) {
          licenseService.getLicenseeProduct(domainName, product, callback);
        } else {
          eventService.getEvent(domainName, product, callback);
        }
      }, function (callback) {
        licenseService.getDomainDetail(domainName, callback);
      }, function (callback) {
        licenseService.getDomainPage(domainName, callback);
      }
    ], function (err, results) {
      if (!err) {
        var data = results[0];
        data.result.licensee = results[1].result.licensee;
        data.result.pages = results[2].result.page;
      }
      cb(err, data)
    });

  } else {
    res.tdgRender(pageConstants.LICENSE_BOOKING, null, {result: ''}, req, res);
  }
};

exports.customPay = function (req, res) {
  var domainName = req.params.domain_name;

  var cb = function (err, data) {
    res.tdgRender(pageConstants.CUSTOM_PAY, null, data, req, res);
  };

  async.parallel([
    function (callback) {
      licenseService.getDomainDetail(domainName, callback);
    }, function (callback) {
      licenseService.getDomainPage(domainName, callback);
    }
  ], function (err, results) {
    if (!err) {
      var data = results[0];
      data.result.pages = results[1].result.page;
    }
    cb(err, data)
  });
};

exports.customPayment = function (req, res) {
  var user_info = req.body;

  var cb = function (err, data) {
    var request = {};
    user_info = data.result.quote;
    user_info.txnid = 'TDG' + user_info.phone.substr(6);
    user_info.key = KEY;
    user_info.amount = user_info.travellers * user_info.price;
    user_info.productinfo = user_info.itinerary_code;

    user_info.hash = hasher.createHash('sha512').update(KEY + "|" + user_info.txnid + "|" + user_info.amount + "|" + user_info.productinfo + "|" + user_info.firstname + "|" + user_info.email + "|||||||||||" + SALT).digest('hex');

    req.session.booking_info = user_info;
    request.request_data = user_info;
    request.request_data.service_provider = "payu_paisa";
    request.request_url = PAYU_SECURE;
    request.request_data.surl = 'http://' + domainName + '/booking/success';
    request.request_data.furl = 'http://' + domainName + '/booking/failure';

    res.tdgRender({view: 'pages/paymentAutoSubmit', do_ab_test: false}, err, {result: {request: request}}, req, res);
  };
  productService.mgBooking(user_info, cb);
};

exports.createBooking = function (req, res) {
  var user_info = req.body, domainName = req.params.domain_name;

  user_info.domain = domainName;


  var cb = function (err, data) {

    var request = {};
    //user_info = data.result.user;
    user_info.phone = user_info.mobile;
    user_info.price = user_info.offer_price;
    user_info.booking_id = data.result.booking.booking_id;
    // user_info.key = KEY;


    if ( user_info.gst_number || user_info.gst_number !== "undefined" || user_info.gst_number !== "null" || user_info.gst_number !== "") {
      if (user_info.advance === 0 || user_info.advance === user_info.offer_price) {
        user_info.amount = (user_info.travellers * user_info.offer_price ) + user_info.tax;
      }

    }
    else {
      user_info.amount = user_info.travellers * user_info.advance;
    }

    user_info.productinfo = user_info.licensee_product;
    user_info.firstname = user_info.name;

    // user_info.hash = hasher.createHash('sha512').update(KEY + "|" + user_info.txnid + "|" + user_info.amount + "|" + user_info.productinfo + "|" + user_info.firstname + "|" + user_info.email + "|||||||||||" + SALT).digest('hex');

    req.session.booking_info = user_info;

    request.request_data = user_info;
    // request.request_data.service_provider = "payu_paisa";
    // request.request_url = PAYU_SECURE;
    request.request_data.surl = 'http://' + domainName + '/booking/success';
    request.request_data.furl = 'http://' + domainName + '/booking/failure';

    res.send(request.request_data);
  };
  licenseService.createBooking(user_info, cb);
};

exports.bookingSuccess = function (req, res) {
  console.log(req.body);
  var pay_info = req.body, booking_info = req.session.booking_info, emailer = {}, domainName = req.params.domain_name;

  req.session.product_id = '';
  _.extend(booking_info, pay_info);
  pay_info.payment_status = true;

  var cb = function (err, data) {
    emailer.subject = 'ALERT:Booking ' + pay_info.status;
    emailer.message = 'Booking Id -' + booking_info.booking_id ;
    helper.sendMail(emailer);
    res.tdgRender(pageConstants.LICENSE_BOOKING_SUCCESS, err, data, req, res);
  };
  //"paid": null,
    var success_cb = function (err,data) {
        async.parallel([
            function (callback) {
                checkoutService.recordBookingStatus(data, domainName, callback)
            }, function (callback) {
                licenseService.getDomainDetail(domainName, callback);
            },function (callback) {
                licenseService.getDomainPage(domainName, callback);
            }
        ], function (err, results) {
            if (!err) {
                var data = results[0];
                data.result.licensee = results[1].result.licensee;
                data.result.pages = results[2].result.page;
            }
            cb(err, data)
        });
    };
    checkoutService.capturePayment(pay_info,success_cb)
};
exports.bookingFailure = function (req, res) {

  var pay_info = req.body, domainName = req.params.domain_name, emailer = {};
  var cb = function (err, data) {
    emailer.subject = 'ALERT:Booking' + pay_info.status;
    emailer.message = 'Booking Id -' + pay_info.txnid;
    helper.sendMail(emailer);

    res.redirect('/booking?failure=true');
  }
  pay_info.payment_status = false;
  checkoutService.recordBookingStatus(pay_info, domainName, cb);

};
