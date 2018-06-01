var winston = require('winston'),
    config = require('../appConfig'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.info = function(message){
  winston.info(message)
}

exports.error = function(message){
  winston.error(message)
}

//if(config.env == 'prod') {
//  mongoose.connect('mongodb://'+ config.logs.mongo +'/tdg_web_log');
//
//  var pageSchema = new Schema({
//    user : {type: String},
//    logTime : {type: Date},
//    ipAddress : {type:String},
//    preferences : {type:Object},
//    query : {type:Object},
//    refererRaw : {type:String},
//    referer : {type: Object},
//    lifetimeCookie : {type: String},
//    url : {type: String},
//    pageInfo : {type: Object},
//    abCohort : {type: String},
//    isAjax : {type: String}
//  }, {strict: false});
//
//  exports.pageSchema = mongoose.model('page_tracking', pageSchema);
//
//  var emailSchema = new Schema({
//  }, {strict: false});
//
//  exports.emailSchema = mongoose.model('email_track', emailSchema);
//
//  var happinessSchema = new Schema({
//    happy : {type: String},
//    user : {type: String},
//    comment : {type: String},
//    email : {type: String},
//    logTime : {type: Date}
//  }, {strict: false});
//
//  exports.happinessSchema = mongoose.model('happiness_record', happinessSchema);
//}


