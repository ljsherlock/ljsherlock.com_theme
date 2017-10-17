module.exports = function(grunt)
{
    grunt.initConfig({

        sass:
        {
            build:
            {
                files:
                {
                 'View/Assets/CSS/style.css': 'View/main.scss'
                }
            }
        },

        requirejs:
        {
            compile:
            {
                options:
                {
                    dir: 'Assets/Build',
                    baseUrl: 'Assets/Scripts',
                    mainConfigFile: 'Assets/Scripts/Lib/requireConfig.js',
                    include: [ 'Main.js' ],
                    modules: [
                    //First set up the common build layer.
                    {
                        //module names are relative to baseUrl
                        name: 'Lib/requireConfig',
                        //List common dependencies here. Only need to list
                        //top level dependencies, "include" will find
                        //nested dependencies.
                        include: ['Core',
                                  'App',
                        ]
                    }],
                }
            }
        },

       // MINIFY CSS
       cssmin:
       {
           options: {
               shorthandCompacting: false,
               roundingPrecision: -1
           },
           target: {
               files: {
                   'View/Assets/CSS/style.min.css' : 'View/Assets/CSS/style.css'
               }
           }
       },

       // SVG OPTIMIZATION
       svgmin:
       {
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
                    cwd: 'View/Assets/SVG/svg-use/',
                    src: ['*.svg', '*/*.svg'],
                    dest: 'View/Assets/SVG/svg-use-optimized/',
                    rename: function (dest, src)
                    {
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

        // SVG SYMBOLS CREATION
       svgstore:
       {
           build: {
               files: {
                     'View/Assets/Icons/icons.svg': 'View/Assets/SVG/svg-final/*.svg',
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


       // DO TASK ON CHANGE
       watch:
       {
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

        // Run Uglify to minify JS
        // js:
        // {
        //    files:
        //    [
        //         'View/Assets/Scripts/*.js',
        //         'View/Assets/Scripts/*/*.js',
        //         'View/_components/*/*/*.js'
        //    ],
        //    tasks: [ 'requirejs' ],
        //     options:
        //     {
        //         spawn: false,
        //         livereload: true
        //     }
        // },

        // optimize SVG
        svg:
        {
            files:
            [
                'View/Assets/SVG/svg-use/*.svg',
                'View/Assets/SVG/svg-use/*/*.svg',
            ],
            tasks: ['svgmin'],
            options:
            {
                spawn: false,
                livereload: true,
            }
        },

        // Create symbol SVG
        svgs: {
            files: [
                'View/Assets/SVG/svg-final/*.svg',
            ],
            tasks: ['svgstore'],
            cleanup: true,
            options: {
                spawn: false,
                livereload: true,
            },
        },
    },

    realFavicon:
    {
        favicons: {
            src: 'View/Assets/Icons/logo.png',
            dest: 'View/Assets/Icons/favicon/',
            options: {
                iconsPath: 'https://ljsherlock.com/app/themes/ljsherlock/MVC/View/Assets/Icons/favicon/',
                html: [ 'View/Assets/Icons/favicon/markup.html' ],
                design: {
                    ios: {
                        pictureAspect: 'backgroundAndMargin',
                        backgroundColor: '#ffffff',
                        margin: '0%',
                        assets: {
                            ios6AndPriorIcons: true,
                            ios7AndLaterIcons: true,
                            precomposedIcons: true,
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
                            lowResolutionIcons: false
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
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-real-favicon');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', [ 'sass', 'cssmin']);

};
