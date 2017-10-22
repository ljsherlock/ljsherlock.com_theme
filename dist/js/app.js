
// declaring strict mode

"use strict";

// Loads specific modules for App.

define([ "Util", 'Config', 'utils/Events' ], function( Util, appConfig, Events )
{
	var	App = {

		/*-- Functions called when a new instance is created --*/

		loadingScreen : document.querySelector('#loadingScreen'),
		overlayLoading : document.querySelector('#overlayLoading'),

		ajaxScreen : document.querySelector('#ajaxScreen'),
		overlayAjax : document.querySelector('#overlayAjax'),

		overlayMenu : document.querySelector('#overlayMenu'),

		main : document.querySelector('main'),

		mainDirection : '',

		overlayAjaxDirection : '',

		ajaxScreenDirection : '',

		html : document.querySelector('html'),

		header : document.querySelector('header'),

		init : function(callback)
		{
			this.ajaxLinks();

			var main = document.querySelector('main');

			document.querySelector('#hamburger').addEventListener('click', function(e)
			{
				var el = e.currentTarget;
				App.hamburger(el);
				App.showMenu('.nav--primary');

				var header = document.querySelector('header');
				var headerModifier = 'header--fade-in';
				if (header.classList.contains(headerModifier)) {
					header.classList.remove(headerModifier);
				} else {
					header.classList.add(headerModifier);
				}

			});

			//Binds
			// Events.bindOne(ajaxScreen, 'animationend', function() {
			// 	Util.addRemoveModifier(this, 'animation', 'remove');
			// });

			// Page load for first time
			setTimeout(function()
			{
				// Close loading screen.
				App.loadingScreen.classList.add('loading-screen--animation-hide');
				App.overlayLoading.classList.add('overlay--animation-hide');
				// HTML
				App.html.classList.add('html--animation-loaded');
				// Main
				App.main.classList.add('main--fade');
				// Header
				App.header.classList.add('header--animation-loaded');

			}, 250);
		},

		ajaxLinks : function()
		{
			require( ['utils/Ajax'], function( Ajax )
			{
				Ajax.internalLinkBefore = function()
				{
					var hamburger = document.querySelector('.hamburger');
					if (hamburger.classList.contains('hamburger--active')) {
						App.hamburger(hamburger);
						App.showMenu('.nav--primary');

						var header = document.querySelector('header');
						var headerModifier = 'header--fade-in';
						if (header.classList.contains(headerModifier)) {
							header.classList.remove(headerModifier);
						} else {
							header.classList.add(headerModifier);
						}
					}

					App.ajaxLinks();

					App.toggleAjaxLoadingScreen();
				};

				Ajax.getPageCallback = function(response)
				{
					var main = document.querySelector('main');
					main.innerHTML = response;
					window.scroll(0, 0);
					Ajax.internalLinks();

					setTimeout(function()
					{
						// Finish Loading animation
						App.toggleAjaxLoadingScreen();

						// Ajax Main
						App.main.classList.add('main--ajax');
						App.main.classList.remove('main--fade');
						void App.main.offsetWidth;
						App.main.classList.add('main--fade');
					}, 750);

				};

				window.onpopstate = function(event)
				{
				  	Ajax.getPage(document.location);
				};

				Ajax.internalLinks();
			});
		},

		toggleAjaxLoadingScreen: function()
		{
			// Ajax Overlay
			App.overlayAjax.classList.remove('overlay--fade');
			void App.overlayAjax.offsetWidth;

			if (App.overlayAjaxDirection == 'normal')
			{
				App.overlayAjax.style.animationDirection = 'reverse';
				App.overlayAjax.style.animationDuration = '.75s';
				App.overlayAjaxDirection = 'reverse';
			} else
			{
				App.overlayAjax.style.animationDirection = '';

				App.overlayAjaxDirection = 'normal';
			}
			App.overlayAjax.classList.add('overlay--fade');

			// Ajax Screen
			App.ajaxScreen.classList.remove('loading-screen--fade');
			void App.ajaxScreen.offsetWidth;

			if (App.ajaxScreenDirection == 'normal')
			{
				App.ajaxScreen.style.animationDirection = 'reverse';
				App.ajaxScreenDirection = 'reverse';
			} else
			{
				App.ajaxScreen.style.animationDirection = '';
				App.ajaxScreenDirection = 'normal';
			}
			App.ajaxScreen.classList.add('loading-screen--fade');
		},

		hamburger : function(el, force)
		{
			var m = 'hamburger--active';

			if( el.classList.contains(m) || force == 'remove' )
			{
				el.classList.remove(m);
				document.body.style.overfow = 'auto';
			} else {
				el.classList.add(m);
				document.body.style.overfow = 'hidden';
			}

			// if(typeof callback === 'function')
			// {
			// 	this.callback();
			// }
		},

		showMenu: function(menuSelector)
		{
			var nav = document.querySelector(menuSelector);
			var m = 'nav--full-screen-show';

			if( nav.length != 0 )
			{
				if( nav.classList.contains(m) )
				{
					nav.classList.remove(m);
				} else {
					nav.classList.add(m);
				}
			}
		}
    }

	return App;
});
