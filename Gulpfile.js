/**
 * Created by himanshuwolf on 31/03/17.
 */

var env = process.env.NODE_ENV || 'dev';

/**
 * @summary Root directories of the assets and templates
 */

var dirList = {
      srcJs: 'public/resources/js', //source path for js files
      srcPhoneJs: 'public/resources/phone/js/', //source path for js files
      srcCss: 'public/resources/css/', //source path for css files
      srcPhoneCss: 'public/resources/phone/css/', //source path for css files
      distCss: 'dist/public/resources/css', //distribution directory path for css
      distPhoneCss: 'dist/public/resources/phone/css', //distribution directory path for css
      distJs: 'dist/public/resources/js', //distribution directory for javascript files
      distPhoneJs: 'dist/public/resources/phone/js', //distribution directory for javascript files
      srcLess: 'dist/public/resources/less/src', //source directory for LESS files, all files in directory will be compiled
      srcPhoneLess: 'dist/public/resources/phone/less/src', //source directory for LESS files, all files in directory will be compiled
      srcJade: 'app/views/', //source path for jade files
      distJade: 'dist/views/', //distribution path for jade file
      srcAssets: 'public/resources/', //source path for static resources
      distAssets: 'dist/public/resources/', //distribution path for static resources

      // licenseSrcAssets: 'public/resources/license', //source path for static resources of license
      // licenseDistAssets: 'dist/public/resources/license', //distribution path for static resources of license
      // licenseSrcLess: 'dist/public/resources/license/less/src',
      // licenseSrcJs: 'public/resources/license/js/', //source path for js files for license
      // licenseSrcCss: 'public/resources/license/css/',//source path for css files for license
      // licenseDistCss: 'dist/public/resources/license/css', //distribution directory path for css
      // licenseDistJs: 'dist/public/resources/license/js' //distribution directory for javascript files
    },


    // licenseAssets = {
    //   css :[
    //     dirList.licenseDistCss + '/bootstrap.css',
    //     dirList.licenseDistCss + '/forms.css',
    //     dirList.licenseDistCss + '/glide.min.css',
    //     dirList.licenseDistCss + '/bootstrap-datetimepicker.min.css',
    //     dirList.licenseDistCss + '/render.css'
    //   ],
    //   js : [
    //     dirList.licenseDistJs + '/lib/jquery-1.11.2.min.js',
    //     dirList.licenseDistJs + '/lib/glide.min.js',
    //     dirList.licenseDistJs + '/lib/bootstrap-datetimepicker.min.js',
    //     dirList.licenseDistJs + '/global.js',
    //     dirList.licenseDistJs + '/modules/**/*.js'
    //   ]
    // },
    commonAssets = {
      css :[
        dirList.distCss + '/bootstrap-grid.css',
        dirList.distCss + '/forms.css',
        dirList.distCss + '/glide.min.css',
        dirList.distCss + '/bootstrap-datetimepicker.min.css'
      ],
      phoneCss :[
        dirList.distPhoneCss + '/bootstrap.m.css',
        dirList.distPhoneCss + '/forms.css',
        dirList.distPhoneCss + '/glide.min.css',
        dirList.distPhoneCss + '/bootstrap-datetimepicker.min.css'
      ],
      js : [
        dirList.distJs + '/lib/jquery-1.11.2.min.js',
        dirList.distJs + '/lib/jquery.autocomplete.min.js',
        dirList.distJs + '/lib/jquery.history.js',
        dirList.distJs + '/lib/glide.min.js',
        dirList.distJs + '/lib/bootstrap-datetimepicker.min.js',
        dirList.distJs + '/global.js',
        dirList.distJs + '/modules/**/*.js'
      ],
      phoneJs : [
        dirList.distPhoneJs + '/lib/jquery-1.11.2.min.js',
        dirList.distJs + '/lib/jquery.autocomplete.min.js',
        dirList.distPhoneJs + '/lib/bootstrap-datetimepicker.min.js',
        dirList.distPhoneJs + '/global.js',
        dirList.distPhoneJs + '/modules/**/*.js'
      ]
    },

    globalAssets = {
      css : [
        dirList.distCss + '/render.css'],
      phoneCss : [
        dirList.distPhoneCss + '/render.m.css']
    },

    homeAssets = {
      css : [
        dirList.distCss + '/home.css',dirList.distCss + '/renderLP.css'],
      phoneCss :[
        dirList.distPhoneCss + '/home.m.css', dirList.distPhoneCss + '/renderLP.m.css'],
      js : [
        dirList.distJs +'/homeManager.js'],
      phoneJs : [
        dirList.distPhoneJs +'/homeManager.js']
    },
    LP_ASSETS = {}, LP_ASSETS_PHONE = {}, GLOBAL_ASSETS = {};

LP_ASSETS.css = commonAssets.css.concat(homeAssets.css);
LP_ASSETS_PHONE.css = commonAssets.phoneCss.concat(homeAssets.phoneCss);

LP_ASSETS.js = commonAssets.js.concat(homeAssets.js);
LP_ASSETS_PHONE.js = commonAssets.phoneJs.concat(homeAssets.phoneJs);

GLOBAL_ASSETS.css = commonAssets.css.concat(globalAssets.css);
GLOBAL_ASSETS.phoneCss = commonAssets.phoneCss.concat(globalAssets.phoneCss);

var config = {
  /**
   * @description - list of assets which will versioned as per their hash
   * @type {Array}
   */
  assetsSrc: [
    'css/**/*.css',
    'js/**/*.js'
  ],
  indexSrc: [
    'dist/views/**/*.jade'
  ],
  /**
   * @description - object for pattern of the assets in config.indexSrc file list
   */
  matchingPattern: {

  },
  watchList : [
    dirList.srcJade + '/**/*',
    dirList.srcAssets + '/**/*'
  ],
  uglifyOptions : {
    mangle: env!=='dev',
    output: {
        beautify: env==='dev'
    }
  }
};

var gulp = require('gulp'),
  clean = require('gulp-clean'),
  nodemon = require('gulp-nodemon'),
  copy = require('gulp-copy'),
  concatCss = require('gulp-concat-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  minifyCss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  less = require('gulp-less');


//---------------------------------------------<Common Task definition>---------------------------------------------------

/**
 * @summary - gulp task to clean the dist directory
 */
gulp.task('clean', function () {
  console.log('This is ' + env+ ' environment');
  console.log(Date.now());
  return gulp.src('./dist', {read: false})
    .pipe(clean());
});

/**
 * @summary - gulp task to copy assets and templates form source to dist
 */
// gulp.task('copy', ['clean'], function() {
//   gulp.src([dirList.srcAssets + '/**/*'], {base:'public'})
//    .pipe(gulp.dest('./dist'));
//    gulp.src([dirList.srcJade+ '/**/*'], {base:'app/views'})
//    .pipe(gulp.dest('./dist/views'));
// });

gulp.task('copy', ['clean'], function() {
  gulp.src([dirList.srcJade+ '/**/*'], {base:'app/views'})
  .pipe(gulp.dest('./dist/views'));

  return gulp.src([, dirList.srcAssets + '/**/*'])
      .pipe(copy('./dist'));
});



gulp.task('desktop', ['revreplace']);
gulp.task('mobile', ['revreplaceM']);
// gulp.task('license', ['revreplaceL']);
gulp.task('prod', ['upload']);

/**
 * @summary - default task
 * @dependency - desktop and mobile
 * @callback - gulp task to watch the file changes and start respective tasks
 */
gulp.task('default', ['desktop', 'mobile'], function() {
    console.log(Date.now());
    console.log('Watching files for change....');
    gulp.watch(config.watchList, ['desktop','mobile']);
});


//--------------------------------------------</Common Task definition>-------------------------------------------------

//--------------------------------------------<Desktop Task definition>-------------------------------------------------

/**
 * @summary - gulp task to compile less files to css [Desktop]
 * @dependency - copy task
 */
gulp.task('less', ['copy'], function() {
  return gulp.src(dirList.srcLess + '/**.*')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
      }))
    .pipe(less({path :''}))
    .pipe(minifyCss({processImport: false}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(dirList.distCss));
});


gulp.task('concatCss',['less'], function () {

  gulp.src(LP_ASSETS.css)
  .pipe(concatCss("TDG_LP.css"))
  .pipe(gulp.dest(dirList.distCss));

  return gulp.src(GLOBAL_ASSETS.css)
      .pipe(concatCss("TDG.css"))
      .pipe(gulp.dest(dirList.distCss))

});

/**
 * @summary - gulp task to concat|uglify the global js files [Desktop]
 * @dependency - copy task
 */
gulp.task('concat', ['copy'], function() {
  gulp.src(LP_ASSETS.js)
  .pipe(concat({path: "TDG_LP.js"}))
  .pipe(gulp.dest(dirList.distJs));

  return gulp.src(commonAssets.js)
    .pipe(concat({path: 'TDG.js'}))
    .pipe(gulp.dest(dirList.distJs))
});

/**
 * @summary - gulp task to uglify the fragments [Desktop]
 * @dependency - concat task
 */
gulp.task('uglify', ['concat'], function() {
  return gulp.src(dirList.distJs + '**/*.js', {base: dirList.distJs})
    .pipe(uglify(config.uglifyOptions))
    .pipe(gulp.dest(dirList.distJs));
});

/**
 * @summary - gulp task to version the css/js [Desktop]
 * @dependency - uglify task
 */
gulp.task("revision", ['uglify', 'concatCss'], function(){
  return gulp.src([dirList.distJs + '/**/*', dirList.distCss + '/**/*'], {base: dirList.distAssets})
    .pipe(rev())
    .pipe(gulp.dest(dirList.distAssets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(dirList.distAssets));
});

/**
 * @summary - gulp task to update the references of versioned files in html [Desktop]
 * @dependency - revision task
 */
gulp.task("revreplace", ["revision"], function(){
  var manifest = gulp.src(dirList.distAssets + "rev-manifest.json");

  return gulp.src(dirList.distJade + "**/*.jade",  {base: dirList.distJade})
    .pipe(revReplace({manifest: manifest,replaceInExtensions: ['.jade']}))
    .pipe(gulp.dest(dirList.distJade));
});


//--------------------------------------------</Desktop Task definition>------------------------------------------------

//---------------------------------------------<Mobile Task definition>-------------------------------------------------

/**
 * @summary - gulp task to compile less files to css [Mobile]
 * @dependency - copy task
 */
gulp.task('lessM', ['copy'], function() {
  return gulp.src(dirList.srcPhoneLess + '/**.*')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
      }))
    .pipe(less({path :''}))
    .pipe(rename(function (path) {
        path.extname= ".m.css";
      }))
    .pipe(minifyCss({processImport: false}))
    .pipe(gulp.dest(dirList.distPhoneCss));
});

gulp.task('concatCssM',['lessM'], function () {
  gulp.src(LP_ASSETS_PHONE.css)
  .pipe(concatCss("TDG_LP.m.css"))
  .pipe(gulp.dest(dirList.distPhoneCss));

  return gulp.src(GLOBAL_ASSETS.phoneCss)
      .pipe(concatCss("TDG.m.css"))
      .pipe(gulp.dest(dirList.distPhoneCss))
});

/**
 * @summary - gulp task to concat|uglify the global js files [Mobile]
 * @dependency - copy task
 */
gulp.task('concatM', ['copy'], function() {
  gulp.src(LP_ASSETS_PHONE.js)
  .pipe(concat({path: "TDG_LP.m.js"}))
  .pipe(gulp.dest(dirList.distPhoneJs))

  return gulp.src(commonAssets.phoneJs)
    .pipe(concat({path: 'TDG.m.js'}))
    .pipe(gulp.dest(dirList.distPhoneJs))
});

gulp.task('uglifyM', ['concatM'], function() {
  return gulp.src(dirList.distPhoneJs + '**/*.js', {base: dirList.distPhoneJs})
    .pipe(uglify(config.uglifyOptions))
    .pipe(gulp.dest(dirList.distPhoneJs));
});

/**
 * @summary - gulp task to revision the css/js files [Mobile]
 * @dependency - concatM task
 */
gulp.task("revisionM", ['uglifyM', 'concatCssM'], function(){
  return gulp.src([dirList.distPhoneJs + '/**/*', dirList.distPhoneCss + '/**/*'], {base: dirList.distAssets})
      .pipe(rev())
      .pipe(gulp.dest(dirList.distAssets))
      .pipe(rev.manifest())
      .pipe(gulp.dest(dirList.distAssets + 'phone'));
});

/**
 * @summary - gulp task to update the references of versioned files [Mobile]
 * @dependency - revisionM task
 */


gulp.task("revreplaceM", ["revisionM"], function(){
  var manifest = gulp.src(dirList.distAssets + "phone/rev-manifest.json");
  var outputDir = '';

  return gulp.src(dirList.distJade + "phone/**/*.jade",  {base: dirList.distJade})
      .pipe(revReplace({manifest: manifest,replaceInExtensions: ['.jade']}))
      .pipe(gulp.dest(dirList.distJade));

});

//---------------------------------------------</Mobile Task definition>-------------------------------------------------


//---------------------------------------------<License Task definition>-------------------------------------------------

/**
 * @summary - gulp task to compile less files to css [Mobile]
 * @dependency - copy task
 */
    // gulp.task('lessL', ['copy'], function() {
    //   return gulp.src(dirList.licenseSrcLess + '/**.*')
    //       .pipe(plumber({
    //         errorHandler: function (err) {
    //           console.log(err);
    //           this.emit('end');
    //         }
    //       }))
    //       .pipe(less({path :''}))
    //       .pipe(minifyCss({processImport: false}))
    //       .pipe(gulp.dest(dirList.licenseDistCss));
    // });

// gulp.task('concatCssL',['lessL'], function () {
//   return gulp.src(licenseAssets.css)
//       .pipe(concatCss("TDG_L.css"))
//       .pipe(gulp.dest(dirList.licenseDistCss));
// });

/**
 * @summary - gulp task to concat|uglify the global js files [Mobile]
 * @dependency - copy task
 */
// gulp.task('concatL', ['copy'], function() {
//   return gulp.src(licenseAssets.js)
//       .pipe(concat({path: 'TDG_L.js'}))
//       .pipe(uglify(config.uglifyOptions))
//       .pipe(gulp.dest(dirList.licenseDistJs));
// });

/**
 * @summary - gulp task to revision the css/js files [Mobile]
 * @dependency - concatM task
 */
// gulp.task("revisionL", ['concatL', 'concatCssL'], function(){
//   return gulp.src([dirList.licenseDistJs + '/**/*', dirList.licenseDistCss + '/**/*'], {base: dirList.licenseDistAssets})
//       .pipe(rev())
//       .pipe(gulp.dest(dirList.licenseDistAssets))
//       .pipe(rev.manifest())
//       .pipe(gulp.dest(dirList.licenseDistAssets));
// });

/**
 * @summary - gulp task to update the references of versioned files [Mobile]
 * @dependency - revisionM task
 */
// gulp.task("revreplaceL", ["revisionL"], function(){
//   var manifest = gulp.src(dirList.licenseDistAssets + "/rev-manifest.json");
//   var outputDir = '';
//
//   return gulp.src(dirList.distJade + "license/**/*.jade",  {base: dirList.distJade})
//       .pipe(revReplace({manifest: manifest,replaceInExtensions: ['.jade']}))
//       .pipe(gulp.dest(dirList.distJade));
// });

//---------------------------------------------</Mobile Task definition>-------------------------------------------------
