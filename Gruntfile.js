var dirList = {
      srcJs: 'public/resources/js/', //source path for js files
      srcPhoneJs: 'public/resources/phone/js/', //source path for js files
      srcCss: 'public/resources/css/', //source path for css files
      distCss: 'dist/public/resources/css', //distribution directory path for css
      distPhoneCss: 'dist/public/resources/phone/css', //distribution directory path for css
      distJs: 'dist/public/resources/js', //distribution directory for javascript files
      distPhoneJs: 'dist/public/resources/phone/js', //distribution directory for javascript files
      srcLess: 'dist/public/resources/less/src', //source directory for LESS files, all files in directory will be compiled
      phoneSrcLess: 'dist/public/resources/phone/less/src', //source directory for LESS files, all files in directory will be compiled
      srcJade: 'app/views/', //source path for jade files
      distJade: 'dist/views/', //distribution path for jade file
      srcAssets: 'public/resources/', //source path for static resources
      distAssets: 'dist/public/resources/', //distribution path for static resources

      licenseSrcAssets: 'public/resources/license', //source path for static resources of license
      licenseDistAssets: 'dist/public/resources/license', //distribution path for static resources of license
      licenseSrcLess: 'dist/public/resources/license/less/src',
      licenseSrcJs: 'public/resources/license/js/', //source path for js files for license
      licenseSrcCss: 'public/resources/license/css/',//source path for css files for license
      licenseDistCss: 'dist/public/resources/license/css', //distribution directory path for css
      licenseDistJs: 'dist/public/resources/license/js' //distribution directory for javascript files
    },


    licenseAssets = {
      css :[
        dirList.licenseDistCss + '/bootstrap.css',
        dirList.licenseDistCss + '/forms.css',
        dirList.licenseDistCss + '/glide.min.css',
        dirList.licenseDistCss + '/bootstrap-datetimepicker.min.css',
        dirList.licenseDistCss + '/render.css'
      ],
      js : [
        dirList.licenseDistJs + '/lib/jquery-1.11.2.min.js',
        dirList.licenseDistJs + '/lib/glide.min.js',
        dirList.licenseDistJs + '/lib/bootstrap-datetimepicker.min.js',
        dirList.licenseDistJs + '/global.js',
        dirList.licenseDistJs + '/modules/**/*.js'
      ]
    },
    commonAssets = {
      css :[
        dirList.distCss + '/bootstrap.css',
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
        dirList.distJs + '/lib/jquery.history.js',
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
    config = {
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

      }
    },
    LP_ASSETS = {}, LP_ASSETS_PHONE = {}, GLOBAL_ASSETS = {};

LP_ASSETS.css = commonAssets.css.concat(homeAssets.css);
LP_ASSETS_PHONE.css = commonAssets.phoneCss.concat(homeAssets.phoneCss);

LP_ASSETS.js = commonAssets.js.concat(homeAssets.js);
LP_ASSETS_PHONE.js = commonAssets.phoneJs.concat(homeAssets.phoneJs);

GLOBAL_ASSETS.css = commonAssets.css.concat(globalAssets.css);
GLOBAL_ASSETS.phoneCss = commonAssets.phoneCss.concat(globalAssets.phoneCss);


module.exports = function (grunt) {

  var env = process.env.NODE_ENV || 'dev', aws = grunt.file.readJSON('awsKeys.json'),
      concurrentTasks = [], prodTasks =[],
      prepareTasks = ['clean:target', 'copy', 'less:development', 'less:phone', 'concat:dist', 'concat:home', 'concat:phone','concat:phoneLP', 'concat_css:files', 'concat_css:home','concat_css:phone', 'concat_css:phoneLP'],
  licenseTask = ['less:license', 'concat:license', 'concat_css:license'];

  if (env == 'dev') {
    concurrentTasks = ['watch', 'nodemon']
  } else {
    prepareTasks.push('uglify');
    prepareTasks.push('cssmin:target');
    prepareTasks.push('cssmin:phone');
    licenseTask.push('cssmin:license');
    prodTasks.push('aws_s3:clean_production');
    prodTasks.push('aws_s3:production')
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      target: ['dist/'],
      license: ['distL']
    },
    copy: {
      main: {
        //nonull : true,
        files: [
          {
            expand: true,
            cwd: dirList.srcAssets,
            src: ['**'],
            dest: dirList.distAssets
          },
          {
            expand: true,
            cwd: dirList.srcJade,
            src: ['**'],
            dest: dirList.distJade
          }
        ]
      },
      license: {
        files: [
          {
            expand: true,
            cwd: dirList.licenseSrcAssets,
            src: ['**'],
            dest: dirList.licenseDistAssets
          }
        ]
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      assets: {
        expand: true,
        cwd: dirList.distAssets,
        src: config.assetsSrc,
        dest: dirList.distAssets
      }
    },
    /**
     * Update index files as per the file revision summary
     */
    userev: {
      index: {
        src: config.indexSrc,
        options: {
          patterns: config.matchingPattern
        }
      }
    },
    less: {
      development: {
        options: {
        },
        files: [
          {
            expand: true,
            cwd: dirList.srcLess,
            src: ['*.less'],
            dest: dirList.distCss,
            ext: '.css'
          }
        ]
      },
      phone: {
        options: {
        },
        files: [
          {
            expand: true,
            cwd: dirList.phoneSrcLess,
            src: ['*.less'],
            dest: dirList.distPhoneCss,
            ext: '.m.css'
          }
        ]
      },
      license: {
        options: {
        },
        files: [
          {
            expand: true,
            cwd: dirList.licenseSrcLess,
            src: ['*.less'],
            dest: dirList.licenseDistCss,
            ext: '.css'
          }
        ]
      }

    },
    watch: {
      statics: {
        files: ['public/**/*', 'app/**/*.jade'],
        tasks: ['prepare', 'version'],
        options: {
          event: ['all'],
          reload: true
        }
      },
      appFiles: {
        files: ['app/**/*', '!app/**/*.jade'],
        tasks: ['nodemon'],
        options: {
          spawn: false
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          delay: 2000
        }
      },
      rss: {
        script: 'rssFeedGen.js',
        options: {
          delay: 2000
        }
      }
    },
    concurrent: {
      default: concurrentTasks,
      options: {
        logConcurrentOutput: true
      }
    },
    concat : {
        options: {
          separator: ';'
        },
        dist: {
          src: commonAssets.js,
          dest: dirList.distJs + '/TDG.js'
        },
      home : {
        options: {
        //separator: ';'
      },
      src: LP_ASSETS.js,
      dest: dirList.distJs + '/TDG_LP.js'
      },
      phone : {
        options: {
          //separator: ';'
        },
        src: commonAssets.phoneJs,
        dest: dirList.distPhoneJs + '/TDG.m.js'
      },
      phoneLP : {
        options: {
          //separator: ';'
        },
        src: LP_ASSETS_PHONE.js,
        dest: dirList.distPhoneJs + '/TDG_LP.m.js'
      },
      license : {
        options: {
          //separator: ';'
        },
        src: licenseAssets.js,
        dest: dirList.licenseDistJs + '/TDG_L.js'
      }

    },
    concat_css: {
      options: {},
      files : {
        src: GLOBAL_ASSETS.css,
        dest: dirList.distCss + '/TDG.css'
      },
      home : {
        options: {},
        src: LP_ASSETS.css,
        dest: dirList.distCss + '/TDG_LP.css'
      },
      phone : {
        options: {},
        src: GLOBAL_ASSETS.phoneCss,
        dest: dirList.distPhoneCss + '/TDG.m.css'
      },
      phoneLP : {
        options: {},
        src: LP_ASSETS_PHONE.css,
        dest: dirList.distPhoneCss + '/TDG_LP.m.css'
      },
      license : {
        options: {
          //separator: ';'
        },
        src: licenseAssets.css,
        dest: dirList.licenseDistCss + '/TDG_L.css'
      }

    },
    uglify: {
      my_target: {
        options : {
          mangle : env !== 'dev',
          beautify : env === 'dev'
        },
        files: [
          {
            expand: true,
            cwd: dirList.distJs,
            src: '**/*.js',
            dest: dirList.distJs
          }
        ]
      }
    },
    cssmin: {
      target: {
        options: {
          keepSpecialComments: 0
        },
        files: [
          {
            expand: true,
            cwd: dirList.distCss,
            src: ['*.css'],
            dest: dirList.distCss,
            ext: '.css'
          }
        ]
      },
      phone: {
        options: {
          keepSpecialComments: 0
        },
        files: [
          {
            expand: true,
            cwd: dirList.distPhoneCss,
            src: ['*.css'],
            dest: dirList.distPhoneCss,
            ext: '.css'
          }
        ]
      },
      license: {
        options: {
          keepSpecialComments: 0
        },
        files: [
          {
            expand: true,
            cwd: dirList.licenseDistCss,
            src: ['*.css'],
            dest: dirList.licenseDistCss,
            ext: '.css'
          }
        ]
      }
    },
    aws_s3: {
      options: {
        accessKeyId: aws.AWS_ID, // Use the variables
        secretAccessKey: aws.AWS_KEY, // You can also use env variables
        region: 'us-west-2',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },

      production: {
        options: {
          bucket: 'tdg-license',
          params: {
            ContentEncoding: 'gzip', // applies to all the files!
            // Two Year cache policy (1000 * 60 * 60 * 24 * 2)
            "CacheControl": "172800000",
            "Expires": new Date(Date.now() + 172800000)
          }
        },
        files: [
          {expand: true, cwd: 'dist/public/', src: ['**'], exclude: "**/.less", dest: 'app/', stream: true}
        ]
      },
      clean_production: {
        options: {
          bucket: 'tdg-license',
          debug: true // Doesn't actually delete but shows log
        },
        files: [
          {dest: 'app/', action: 'delete'}
        ]
      }
    }
  })

  require('load-grunt-tasks')(grunt);


  /**
   * Registering revision preparing task
   * @description - create matching pattern regex from file revision history
   */
  grunt.registerTask('revPrepare', 'Add the files to pattern', function () {
    var history = grunt.filerev.summary;
    var i = 0, fileName;
    if (env == 'dev') {
      console.log(history)
    }
    for (var key in history) {
      fileName = key.lastIndexOf('\\') > 0 ? key.substr(key.lastIndexOf('\\') + 1) : key.substr(key.lastIndexOf('/') + 1);
      if (env == 'dev') {
        console.log(fileName)
      }
      config.matchingPattern['Asset count ' + i] = new RegExp('resources[a-zA-Z0-9.\/]*' + fileName, 'g');
      i += 1;
    }
    grunt.log.writeln(i + 'pattern added');
  });

  grunt.registerTask('prepare', prepareTasks);
  grunt.registerTask('license', licenseTask);
  grunt.registerTask('version', ['filerev', 'revPrepare', 'userev']);
  grunt.registerTask('upload', prodTasks);
  //grunt.registerTask('license', licenseTask);
  grunt.registerTask('default', [ 'prepare', 'license', 'version', 'concurrent'])
}