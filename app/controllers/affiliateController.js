/**
 * Created by Harshit Maheshwari on 30/02/17.
 */
var affiliateService  = require('../services/affiliateService'),
    // location_constant = require('../constants/tourBoksLocationConstants'),
    pageConstants = require('../constants/pageInfoConstants');


// for the details of product search
exports.productSearch = function(req, res) {
    var cb = function (err, data) {
        res.send(data);
    },
    params = {
        // country : [location_constant[req.query.country]]
    };

    affiliateService.tourBoksProductSearch(params, cb);

};

// for the details of product search
exports.productDetails = function(req, res) {
    var cb = function (err, data) {
        res.tdgRender(pageConstants.TOURBOKS_PACKAGES, err, {result:data}, req, res, true)
    };
    var id = req.query.pi;
    affiliateService.tourBoksProductDetails(id, cb);

};

// for availabity of dates
exports.availableDates = function (req, res) {
    var cb = function (err, data) {
        res.send(data);
    };
    var params = {
        productId: req.query.pi,
        dateFrom: req.query.from,
        dateTo: req.query.to
    };
    affiliateService.tourBoksAvailableDates(params, cb);

};

exports.confirmedTimeslot = function (req, res) {
    var cb = function (err, data) {
        res.send(data);
    };
    var params = {
        productId: req.query.pi,
        date: req.query.date,
        persons: [
            {
                personType: req.query.pt,
                numItems: req.query.ni
            }
        ],
        "currency" : "INR"
    };



    affiliateService.tourBoksTimeSlot(params, cb);
};


exports.createOrder = function (req, res) {
    var cb = function (err, data) {
        res.send(data);
    };
    var params = {
        "currency": "INR",
        "title": 0,
        "firstName": "Harsh",
        "lastName": "Mahesh",
        "email": "demo@demo.com",
        "country": 90,
        "city": "Delhi",
        "address": "Royal Orchid, Bangalore",
        "state": "karnataka",
        "zip": "123456",
        "phone": "+123456789",
        "isInvoice": 0,
        "remarks": "remarks here",
        "products": [
            {
                "id": 9,
                "dateSelected": "2017-04-27",
                "personType": [
                    {
                        "personType": "1",
                        "numItems": 2
                    }
                ],
                "timeslots": "526",
                "extras": []

            }
        ]
    };
    affiliateService.tourBoksCreateOrder(params, cb);

};

/*{
productId: req.query.pi,
    date: req.query.date,
    persons: [
    {
        personType: req.query.pt,
        numItems: req.query.ni
    }
],
    variantId : req.query.vi,
    opponentId: req.query.oi,
    localeId: req.query.li
};*/

exports.bookingSuccessCall = function (req, res) {
    var cb = function (err, data) {
        res.send(data);
    };
    var orderId = req.params.orderId;
    var params = {
        "transactionDate": "2016-12-16"
    };
    affiliateService.tourBoksSuccessCall(orderId, params, cb);
}