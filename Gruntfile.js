module.exports = function(grunt)
{
  grunt.initConfig({

    /*------------------------------------------------------
    \*            SCSS
    \*-----------------------------------------------------*/
    //
    sass: {
      build: {
        files: {
         'dist/css/style.css': 'src/scss/styles.scss'
        }
      }
    },

    scsslint: {
      allFiles: [
        'src/scss/*.scss',
        'src/scss/abstracts/*.scss',
        'src/scss/abstracts/*/*.scss',
        'src/scss/base/*.scss',
        'src/scss/components/*.scss',
        'src/scss/components/*/*.scss',
        'src/scss/components/*/*/*.scss',
        'src/scss/layouts/*.scss',
        'src/scss/layouts/*/*.scss',
        'src/scss/*.scss'
      ],
      options: {
        reporterOutput: 'scss-lint-report.xml',
        colorizeOutput: true
      },
    },


    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require("stylelint")({
            "rules": {
              "at-rule-no-unknown": true,
              "block-no-empty": true,
              "color-no-invalid-hex": true,
              "comment-no-empty": true,
              "declaration-block-no-duplicate-properties": [ true, {
                ignore: ["consecutive-duplicates-with-different-values"],
              } ],
              "declaration-block-no-redundant-longhand-properties": true,
              "declaration-block-no-shorthand-property-overrides": true,
              "font-family-no-duplicate-names": true,
              "function-calc-no-unspaced-operator": true,
              "function-linear-gradient-no-nonstandard-direction": true,
              "keyframe-declaration-no-important": true,
              "media-feature-name-no-unknown": true,
              "no-empty-source": true,
              "no-extra-semicolons": true,
              "no-invalid-double-slash-comments": true,
              "property-no-unknown": true,
              "selector-pseudo-class-no-unknown": true,
              "selector-pseudo-element-no-unknown": true,
              "selector-type-no-unknown": true,
              "shorthand-property-no-redundant-values": true,
              "string-no-newline": true,
              "unit-no-unknown": true,
            },
          }),
          require('cssnano')() // minify the result

        ]
      },
      dist: {
        src: 'dist/css/style.css',
        dest: 'dist/css/style.min.css'
      }
    },

    /*------------------------------------------------------
    \*            requireJS
    \*-----------------------------------------------------*/

    requirejs:
    {
      compile:
      {
        options:
        {
          dir: 'dist/js',
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/lib/require-config.js',
          include: [ 'main.js' ],
          modules: [
          //First set up the common build layer.
          {
            //module names are relative to baseUrl
            name: 'lib/require-config',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['core', 'app', 'utils' ]
          }],
        }
      }
    },

    /*------------------------------------------------------
    \*            SVG
    \*-----------------------------------------------------*/
    svgmin: {
     options: {
       plugins: [
         {
             removeDimensions: true
         }
       ]
     },
     dist: {
       files: [{
          expand: true,
          cwd: 'src/svg/svg-use/',
          src: ['*.svg', '*/*.svg'],
          dest: 'src/svg/svg-use-optimized/',
          rename: function (dest, src) {
            // return only the filename from the source
            // this prevents the tasks preserving the
            // directory structure here.
            var out = dest + src;
            if(src.indexOf("/") > -1) {
                out = dest + src.split('/')[1];
            }
            return out;
          }
        }]
      }
    },

    svgstore: {
       build: {
           files: {
                 'dist/icons/icons.svg': 'src/svg/svg-final/*.svg',
           },
       },
       options: {
           prefix: 'icon-',
           svg: {
                xmlns: 'http://www.w3.org/2000/svg',
               style: 'display:none;'
           }
       }
    },

    'convert-svg-to-png': {
      fallback: {
        options: {
          size: {w: '100px', h: '100px'},
        },
        files: [{
          expand: true,
          src: ["src/svg/svg-final/*.svg"],
          dest: "dist/icons/png/"
        }]
      }

    },

     /*------------------------------------------------------
     \*            WATCH
     \*-----------------------------------------------------*/
    watch: {
       // No task. Just reload.
      html: {
       files: [
         '../*.php',
         '*.php',
         'View/_components/*.twig',
         'View/_app/*.twig',
         'View/_macros/*.twig',
         'View/_components/**/*.twig',
         'View/_components/***/*.twig',
         'View/_app/**/*.twig',
         'View/_app/***/*.twig',
         '*.php',
         '**/*.php',
         '**/**/*.php'
       ],
       options: {
         spawn: false,
         livereload: true
       }
      },

      // Run build to compile SCSS and minify result
      styles: {
        files: [
          'View/_components/*.scss',
          'View/_components/**/*.scss',
          'View/_components/**/**/*.scss',
          'View/_components/**/**/**/*.scss',
          'View/_components/*.scss',
          'View/_app/**/*.scss',
          'View/_app/**/**/*.scss',
          'View/_app/**/**/**/*.scss',
          'View/main.scss',
        ],
        tasks: [ 'build' ],
        options: {
            spawn: false,
            livereload: true
        }
      },

      // optimize svg
      svg: {
        files: [
            'src/svg/svg-use/*.svg',
            'src/svg/svg-use/*/*.svg',
        ],
        tasks: ['svgmin'],
        options: {
            spawn: false,
            livereload: true,
        }
      },

      // Create symbol svg
      svgs: {
          files: [
              'assets/svg/svg-final/*.svg',
          ],
          tasks: ['svgstore'],
          cleanup: true,
          options: {
              spawn: false,
              livereload: true,
          },
      }
    },

    /*------------------------------------------------------
    \*            FAVICONS
    \*-----------------------------------------------------*/

    realFavicon: {
        favicons: {
            src: 'assets/icons/logo.png',
            dest: 'assets/icons/favicon/',
            options: {
                iconsPath: 'https://ljsherlock.com/app/themes/ljsherlock/MVC/assets/icons/favicon/',
                html: [ 'assets/icons/favicon/markup.html' ],
                design: {
                    ios: {
                        pictureAspect: 'backgroundAndMargin',
                        backgroundColor: '#ffffff',
                        margin: '0%',
                        assets: {
                            ios6AndPrioricons: true,
                            ios7AndLatericons: true,
                            precomposedicons: true,
                            declareOnlyDefaultIcon: false
                        }
                    },
                    desktopBrowser: {},
                    windows: {
                        pictureAspect: 'noChange',
                        backgroundColor: '#ffc40d',
                        onConflict: 'override',
                        assets: {
                            windows80Ie10Tile: false,
                            windows10Ie11EdgeTiles: {
                                small: false,
                                medium: true,
                                big: false,
                                rectangle: false
                            }
                        }
                    },
                    androidChrome: {
                        pictureAspect: 'noChange',
                        themeColor: '#ffffff',
                        manifest: {
                            name: 'Sherlock',
                            display: 'standalone',
                            orientation: 'notSet',
                            onConflict: 'override',
                            declared: true
                        },
                        assets: {
                            legacyIcon: false,
                            lowResolutionicons: false
                        }
                    },
                    safariPinnedTab: {
                        pictureAspect: 'blackAndWhite',
                        threshold: 92.8125,
                        themeColor: '#e6a1a1'
                    }
                },
                settings: {
                    scalingAlgorithm: 'Mitchell',
                    errorOnImageTooSmall: false
                },
                versioning: {
                    paramName: 'v',
                    paramValue: 'WGLYX443lM'
                }
            }
        }
    }
});

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-real-favicon');
  grunt.loadNpmTasks("grunt-convert-svg-to-png");

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['sass', 'postcss']);

  grunt.registerTask('default', ['scsslint']);

  grunt.registerTask('default', ['icons']);
  grunt.registerTask('icons', ['svgmin', 'svgstore', 'convert-svg-to-png']);

  grunt.registerTask('default', ['svgstore']);
  grunt.registerTask('default', ['svgmin']);

};
