/**
 * Created with IntelliJ IDEA.
 * User: Himanshu Jain
 * Date: 3/11/15
 * Time: 8:03 PM
 * To change this template use File | Settings | File Templates.
 */

//Utility to make calls to API server and prepare request for calls etc
//

'use strict';

var request = require('request'),
    _ = require('underscore'),
    appConfig = require('../appConfig');


/**
 * makes http call to server and also handles
 * @param options - configuration and data for call
 * @param cb - callback method to be executed when response is received
 */
exports.httpRequest = function (options, cb) {

    var config = {
        url: appConfig.api.url,
        method: 'GET',
        json: true,
        form: null,
        rejectUnauthorized: false,
        followAllRedirects: true,
        headers : {'User-Agent': global.deviceType || ''}
    };

    Object.assign(config, options);

    console.log("Request hit:" + config.url);

    request(config, function (err, resp, body) {
        var respData;

        //when no response from server, usually this happens when:
        // 1. The server IP is not correct
        // 2. The server is down
        if (err){
            console.log(err);
            return cb({statusCode:500,message: 'Connection timeout'});
        }

        //case when we received response from server
        else if (resp.statusCode === 200 || resp.statusCode === 201) {

            //checking if body is in JSON format or not
            //if it is not in json format, it is converted into one
            if (config.parseJSON && typeof body === 'string') {
                respData = JSON.parse(body);
            } else {
                respData = body;
            }
            respData.status = resp.statusCode;
            return  cb(null, respData);

        }

        else if(parseInt(resp.statusCode/100) === 4 && resp.statusCode !== 404) {
            // status code is 4xx
            respData = {};

            //checking if body is in JSON format or not
            //if it is not in json format, it is converted into one
            try {
                if (config.parseJSON && typeof body === 'string') {
                    respData = JSON.parse(body);
                } else {
                    respData = body;
                }
            } catch(e) {
                respData.message = 'Something is not right'
            }
            respData.status = resp.statusCode;
            console.log(respData);

            return  cb(null, respData);
        }
        else {

            switch (resp.statusCode) {
                case 404:
                    console.log("Page not found : "+ options.url);
                    return cb({statusCode:404,message: 'Request cannot be completed'}, body);

                    break;
                default:
                    console.log('Error in API call ' + options.url + " : " + resp.statusCode);
                    console.log("API Request : " + JSON.stringify(options, null, 2));
                    return cb({statusCode:500,message: 'Error in API response'});
            }
        }
    });
};


// For TourBoks Basic Auth
exports.tourBoksRequest = function (options, cb) {

    var config = {
        url: appConfig.api.url,
        method: 'GET',
        json: true,
        form: null,
        rejectUnauthorized: false,
        followAllRedirects: true,
        headers: {
            'Authorization': 'Basic ' + new Buffer(appConfig.tourboks_api.USERNAME + ':' + appConfig.tourboks_api.PASSWORD).toString('base64')
        }
    }

    Object.assign(config, options);

    //console.log("Request hit:" + config.url);

    request(config, function (err, resp, body) {
        var respData;

        //when no response from server, usually this happens when:
        // 1. The server IP is not correct
        // 2. The server is down
        if (err){
            console.log(err);
            return cb({statusCode:500,message: 'Connection timeout'});
        }

        //case when we received response from server
        else if (resp.statusCode === 200 || resp.statusCode === 201) {

            //checking if body is in JSON format or not
            //if it is not in json format, it is converted into one
            if (config.parseJSON && typeof body === 'string') {
                respData = JSON.parse(body);
            } else {
                respData = body;
            }
            respData.status = resp.statusCode;
            return  cb(null, respData);

        }

        else if(parseInt(resp.statusCode/100) === 4 && resp.statusCode !== 404) {
            // status code is 4xx
            respData = {};

            //checking if body is in JSON format or not
            //if it is not in json format, it is converted into one
            try {
                if (config.parseJSON && typeof body === 'string') {
                    respData = JSON.parse(body);
                } else {
                    respData = body;
                }
            } catch(e) {
                respData.message = 'Something is not right'
            }
            respData.status = resp.statusCode;
            console.log(respData);

            return  cb(null, respData);
        }
        else {

            switch (resp.statusCode) {
                case 404:
                    console.log("Page not found : "+ options.url);
                    return cb({statusCode:404,message: 'Request cannot be completed'}, body);

                    break;
                default:
                    console.log('Error in API call ' + options.url + " : " + resp.statusCode);
                    console.log("API Request : " + JSON.stringify(options, null, 2));
                    return cb({statusCode:500,message: 'Error in API response'});
            }
        }
    });
};