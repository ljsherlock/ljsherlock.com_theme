grunt.loadNpmTasks('grunt-real-favicon');

grunt.initConfig({
	realFavicon: {
		favicons: {
			src: 'logo.png',
			dest: 'favicons/',
			options: {
				iconsPath: 'https://ljsherlock.com/app/themes/ljsherlock/MVC/View/Assets/Icons/favicon/',
				html: [ 'favicons/markup.html' ],
				design: {
					ios: {
						pictureAspect: 'backgroundAndMargin',
						backgroundColor: '#ffffff',
						margin: '0%',
						assets: {
							ios6AndPriorIcons: true,
							ios7AndLaterIcons: true,
							precomposedIcons: false,
							declareOnlyDefaultIcon: true
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
