/**
 * Created by Himanshu wolf on 19/10/16.
 */

var config = require('../appConfig'), logger = require('./loggingUtils');

var mailer = require('nodemailer'),_ = require('underscore');

var xoauth2 = require('xoauth2');

var itemConstants = require('../constants/itemsConstants');

var transporter = mailer.createTransport({
  service: 'Gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: 'jainjainhimanshu@gmail.com',
      clientId: '673292150278-6bchod2lqujo8306e2rpjlki4pis2qrk.apps.googleusercontent.com',
      clientSecret: 'asSHiBnnJMhf05vlUjdW27D8',
      refreshToken: '1/YX5wNwmOPhEdUyvSM3qrdfrYkApgKhnQ69RfjqSI1M4'
    //  //accessToken: '{cached access token}'
    })
    //user: config.email.USER, // Your email id
    //pass: config.email.PASSWORD // Your password
  }
});

exports.sendMail = function(email_data, cb) {
  var options = {
    from: 'jainjainhimanshu@gmail.com',
    to: 'hello@traveldglobe.com',
    bcc: ["himanshujain.2792@gmail.com", "himanshu00f@gmail.com", "jainjainhimanshu@gmail.com"],
    subject: email_data.subject,
    html: email_data.message
  };

  transporter.sendMail(options, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
    if(cb){
      cb(error, info);
    }
  });
};


exports.serializeJSON = function(user_info) {
  var string = '', index, params=[];
  for(var key in user_info) {
    if(user_info[key].constructor === Array) {
      params =user_info[key]
      index = params.length;
      while(index) {
        index -=1;
        string += key + '=' +params[index] + '&';
      }

    } else {
      string += key + '=' +user_info[key] + '&';
    }
  }
  return string;
};

exports.countTotalItems = function(items) {
  var count = 0;
  for(var key in items) {
    count += parseInt(items[key])
  }
  return count;
}

exports.getItemFromId = function(key){
  return itemConstants[key]
}