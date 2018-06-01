/**
 * Created by himanshujain on 07/04/15.
 */

'use strict';


var FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth2').Strategy,
    config = require('../app/appConfig'),
    urlTemplate = require('../app/constants/urlTemplates'),
    linkManager = require('../app/utils/LinkManager'),
    apiUtils = require('../app/utils/APIUtils');

module.exports = function(passport) {

  /**
   * @desc - Serialize the user id to push into the session
   */
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  /**
   * @desc - Deserialize the user object based on a pre-serialized token
   */
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Use facebook strategy
  passport.use(new FacebookStrategy({
        clientID: config.oAuth.facebook.clientID,
        clientSecret: config.oAuth.facebook.clientSecret,
        callbackURL: config.oAuth.facebook.callbackURL,
        scope : ['public_profile', 'email', 'user_friends'],
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
      },
      function(accessToken, refreshToken, profile, done) {
        // handle user login
        console.log(accessToken);
        console.log(profile);
        if(!profile.emails) {
          done('email-required');
          return;
        }
          var options = {
            url : linkManager.getApiUrl(urlTemplate.LOGIN_OAUTH.url),
            method : urlTemplate.LOGIN_OAUTH.method,
            body : profile
          };
        //done(null, profile);
        apiUtils.httpRequest(options, function(err, data) {
            return done(err, data);
        });
      }
  ));


  passport.use(new GoogleStrategy({
        clientID: config.oAuth.google.clientID,
        clientSecret:config.oAuth.google.clientSecret,
        callbackURL: config.oAuth.google.callbackURL,
        scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email', ],
        passReqToCallback   : true
      },
      function(request, accessToken, refreshToken, profile, done) {
        profile["_json"]["email"] = profile.email;
        profile["_json"]["name"] = profile["_json"].displayName;
        console.log(accessToken);
        console.log(profile);
        var options = {
          url : linkManager.getApiUrl(urlTemplate.LOGIN_OAUTH.url),
          method : urlTemplate.LOGIN_OAUTH.method,
          body : profile
        };
        apiUtils.httpRequest(options, function(err, data) {
          return done(err, data);
        });
      }
  ));
};
