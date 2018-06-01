/**
 * Created by Himanshu wolf on 09/07/15.
 */

var apiUtils = require('../utils/APIUtils'),
    appConfig = require('../appConfig'),
    urls = require('../constants/urlTemplates'),
    linkManager = require('../utils/LinkManager');

// Give SES the details and let it construct the message for you.
var createBookingObject = function(txn_details) {
  console.log(txn_details);
  var booking_obj = {};
  booking_obj.booking_id = txn_details.notes.booking_id;
  booking_obj.paid = txn_details.amount/100;
  booking_obj.payment_success = true;
  booking_obj.razorpay_payment_id = txn_details.razorpay_payment_id;
  return booking_obj;
}

exports.recordBookingStatus = function(txn_details, domain_name, cb) {
    console.log(txn_details);
  var booking_obj = createBookingObject(txn_details);
  var options ={
    url: linkManager.getApiUrl(urls.LICENSE_UPDATE_BOOKING.url, {domain:domain_name}),
    method: urls.LICENSE_UPDATE_BOOKING.method,
    body: booking_obj
  };

  apiUtils.httpRequest(options, cb)
};

exports.capturePayment = function(txn_details,cb) {
    var options ={
        url: "https://"+appConfig.rzp.KEY+":"+appConfig.rzp.SECRET+"@api.razorpay.com/v1/payments"+"/"+txn_details.razorpay_payment_id+"/capture",
        method: "POST",
        body: {"amount":txn_details.amount*100}
    };

    apiUtils.httpRequest(options,cb)
};
