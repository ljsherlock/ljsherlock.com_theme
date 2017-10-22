// declaring strict mode
"use strict";

 define(['Lib/requireConfig', 'Config'], function(Config, appConfig)
 {
    var w = window,
    d = document,
    e = document.documentElement,
    g = document.getElementsByTagName('body')[0],
    x = window.innerWidth,
    y = window.innerHeight;

    var Utils = {

        isArray: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },

        isFunction: function(obj)
        {
            return Object.prototype.toString.call(obj) === '[object Function]';
        },

        each: function(obj, callback)
        {
            var length = obj.length,
                isObj = (length === undefined) || this.isFunction(obj);
            if (isObj) {
                for(var name in obj) {
                    if(callback.call(obj[name], obj[name], name) === false ) {
                        break;
                    }
                }
            }
            else {
                for(var i = 0, value = obj[0];
                    i < length && callback.call(obj[i], value, i) !== false;
                    value = obj[++i] ) {}
            }
            return obj;
        },

        makeArray: function(arrayLike)
        {
            if(arrayLike.length != null) {
                return Array.prototype.slice.call(arrayLike, 0)
                        .filter(function(ele) { return ele !== undefined; });
            }
            return [];
        },

        fitToWindow : function(e)
        {
            var el = this.d.querySelector(e);
            var h = this.w.innerHeight;
            if ( !el ) return;
            el.style.height = h + 'px';
        },

        fullscreen : function(e)
        {
            this.fitToWindow(e);
            window.onresize = function() {
                Util.fitToWindow(e);
            }
        },

        delegate : function(el, evt, sel, handler)
        {
            el.addEventListener(evt, function(event) {
                var t = event.target;
                while (t && t !== this) {
                    if( typeof t.matches === 'function' )
                    {
                        if (t.matches(sel))
                        {
                            handler.call(t, event);
                        }
                    } else {
                        if (t.matchesSelector(sel))
                        {
                            handler.call(t, event);
                        }
                    }

                    t = t.parentNode;
                }
            });
        },

        getCookie: function(name)
        {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
        },

        addRemoveModifier: function(el, modifier, action = 'add')
        {
            var regex = new RegExp( '--' +modifier+'.*' );
            var classes = '';

            [].forEach.call(el.className.split(' '), function(c, index, array)
            {
                if( regex.test(c) )
                {
                    if(action == 'add')
                    {
                        el.classList.add(c);
                    }
                    if(action == 'remove')
                    {
                        el.classList.remove(c);
                    }
                }
            });

            return classes;
        },

        removeModifier: function(el, modifier)
        {
            Utils.getModifier(el, modifier) ;
        },

        delete_cookie : function( name )
        {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },

        supportSVG : function()
        {
            return !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect);
        },

        generate_id: function(length)
        {
             var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

             if (! length) {
                  length = Math.floor(Math.random() * chars.length);
             }

             var str = '';
             for (var i = 0; i < length; i++) {
                  str += chars[Math.floor(Math.random() * chars.length)];
             }
             return str;
        },

        detect_ie : function()
        {
    		  var ua = window.navigator.userAgent;

    		  // Test values; Uncomment to check result …

    		  // IE 10
    		  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    		  // IE 11
    		  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    		  // Edge 12 (Spartan)
    		  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    		  // Edge 13
    		  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    		  var msie = ua.indexOf('MSIE ');
    		  if (msie > 0) {
    		    // IE 10 or older => return version number
    		    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    		  }

    		  var trident = ua.indexOf('Trident/');
    		  if (trident > 0) {
    		    // IE 11 => return version number
    		    var rv = ua.indexOf('rv:');
    		    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    		  }

    		  var edge = ua.indexOf('Edge/');
    		  if (edge > 0) {
    		    // Edge (IE 12+) => return version number
    		    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    		  }

    		  // other browser
    		  return false;
    	},

        /**
    	* Detect device type by user agent or browser window width
    	*
    	* @returns {bool} true|false
    	*/
    	detectDevice: function ()
        {
            var browserString = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

            //if user on mobile or small browser width
            if (/Android|webOS|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= appConfig.mobileWidthMax) {
            	return {
                    isMobile: true,
                    isTablet: false,
                    isDesktop: false
                }
            }
            else if(/Android|webOS|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= appConfig.tabletWidthMax){
                return {
                    isTablet : true,
                    isMobile : false,
                    isDesktop : false
                }
            } else {
                return {
                    isTablet : false,
                    isMobile : false,
            		isDesktop : true
                }
            }
    	},

        dekstop_nav__hide : function()
        {
    		// We need to position the header above the window before we make it fixed so that
    		// it can transition down

    		var didScroll;
    		var lastScrollTop = 0;
    		var delta = 5;
    		var navbarHeight = $('header nav#mainMenu').outerHeight();

    		$(window).scroll(function(event)
    		{
    			 didScroll = true;
    		});

    		setInterval(function()
    		{
    			 if (didScroll) {
    				  hasScrolled();
    				  didScroll = false;
    			 }
    		}, 250);

    		function hasScrolled()
    		{
    			 var st = $(window).scrollTop();
    			 // Make surce they scroll more than delta
    			 if(Math.abs(lastScrollTop - st) <= delta)
    				  return;

    			 // If they scrolled down and are past the navbar, add hide class
    			 // This is necessary so you never see what is "behind" the navbar.
    			 if(st == 0) {
    				$('header').removeClass('header--hide-it');
    				$('header').removeClass('header--fixed');
    				$('header').find('.nav__menu').addClass('flex-row__flex-col--center').removeClass('flex-row__flex-col--centered');

    			// Scroll Down. So hide for better UX (reading)
    			 } else if (st > lastScrollTop && st > 0){
    				  $('header').addClass('header--hide-it').removeClass('header--fixed');
    				  $('header').find('.nav__menu').addClass('flex-row__flex-col--centered').removeClass('flex-row__flex-col--center');

    	  		// Scroll Up. So show the menu.
    			// If we're above the navbar, show full,
    			// otherwise diet.
    			 } else {
    				  if(st + $(window).height() < navbarHeight) {
    						$('header').removeClass('header--hide-it');
    				  } else {
    					  $('header').removeClass('header--hide-it');
    					  $('header').addClass('header--fixed');
    				  }
    			 }
    			 lastScrollTop = st;
    		}
    	},

        make_list_from_select : function( select )
        {
            //array of list items with value and title
            [].forEach.call(document.querySelectorAll(select), function(el, index, array) {
                el.classList.add('custom-select__list--hidden');

                var i, e, v, t;
                var items = [];
                var obj = {};
                var ul = '<ul class="custom-select__list custom-select__list--'+index+'">';
                var options = el.getElementsByTagName('option');

                for (i = 1; i < options.length; ++i) {
                    obj = {};
                    e = options[i];
                    v = e.getAttribute('value');
                    t = e.text;
                    obj['text'] = t;

                    var id = Util.generate_id(10);
                    options[i].setAttribute('id', id);
                    //create list items
                    var listItem = '<li class="custom-select__item" id="'+id+'">'+obj['text']+'</li>';

                    ul += listItem;
                }
                ul += '</ul>';
                el.insertAdjacentHTML('afterend', ul);
            });
        },

        /* [ A ] */

            addLoadEvent: function(func)
            {
                var oldonload = window.onload;
                if (typeof window.onload != 'function') {
                    window.onload = func;
                } else {
                window.onload = function() {
                    if (oldonload) {
                        oldonload();
                    }
                        func();
                    }
                }
            },

            addEventHandler: function(elem, eventType, handler)
            {
                if (elem.addEventListener)
                    elem.addEventListener (eventType, handler, false);
                else if (elem.attachEvent)
                    elem.attachEvent ('on' + eventType, handler);
            },

        /* [ B ] */

            /**
            * @name button_click
            * @function Default action for buttons: Add classes for button status
            */
            buttonState : function(button, overlay)
            {
                [].forEach.call(document.querySelectorAll(button), function(el)
                {
                    el.addEventListener('click', function(event)
                    {
                        event.preventDefault();

                        var zhege = this;
                        var selected = document.querySelectorAll('.btn--active');
                        var event_overlay = zhege.parentNode.parentNode.querySelector(overlay);

                        // Status: Inactive
                        if(zhege.classList.contains('btn--active')) {
                            zhege.classList.remove('btn--active');
                            zhege.classList.add('btn--inactive');
                            if(event_overlay !== null) {
                                event_overlay.classList.remove('events-overlay--visible');
                            }

                        // Status: Active
                        } else {
                            zhege.classList.remove('btn--inactive');
                            zhege.classList.add('btn--active');
                            if(event_overlay !== null) {
                                event_overlay.classList.add('events-overlay--visible');
                            }
                        }

                        //
                        if(selected !== null && selected.length > 0) {
                            [].forEach.call(selected, function(el) {
                                el.classList.remove('btn--active');
                                el.classList.add('btn--inactive');
                            });
                        }
                    });
                });
            },

        /* [ C ] */
        /* [ D ] */

            DOMReady : function(callback)
            {
                if (/comp|inter|loaded/.test(document.readyState))
                {
                    // In case DOMContentLoaded was already fired, the document readyState will be one of "complete" or "interactive" or (nonstandard) "loaded".
                    // The regexp above looks for all three states. A more readable regexp would be /complete|interactive|loaded/
                    callback();
                }
                    else
                {
                    // In case DOMContentLoaded was not yet fired, use it to run the "start" function when document is read for it.
                    document.addEventListener('DOMContentLoaded', function()
                    {
                        callback();
                    }, false);
                }
            },

        /* [ E ] */
        /* [ F ] */
        /* [ G ] */

            get_images : function(key, retina, callback)
            {
                //ajax to get all imagems
                var data = {};
                data.action = 'get_images';
                data.global_hero = document.querySelector('[global_hero]').getAttribute('global_hero');
                data.id = document.querySelector('[page-id]').getAttribute('page-id');
                data.parent_id = document.querySelector('[parent-id]').getAttribute('parent-id');
                data.image_key = key;
                data.retina = retina;

                $.ajax(
                {
                    url: ajax_url,
                    data: data,
                    context: document.body,
                    dataType: 'json',
                    success: function(response)
                    {
                        if (typeof callback === 'function')
                        {
                            callback(response);
                        }
                        else
                        {
                            console.log("Failed to find ajax function " + callback);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        console.log(jqXHR, textStatus + errorThrown);
                    }
                });
            },

        /* [ H ] */
        /* [ I ] */

            isRetinaDevice: function()
            {
                if (('devicePixelRatio' in window && window.devicePixelRatio >= 1.5) ||
                    ('matchMedia' in window && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)").matches))
                    {
                        return true;
                    }
                else
                    {
                        return false;
                    }
            },

        /* [ J ] */
        /* [ K ] */
        /* [ L ] */

            loadScript: function (src, done)
            {
                var js = document.createElement('script');
                js.src = src;
                js.onload = function() {
                    done();
                };
                js.onerror = function() {
                    done(new Error('Failed to load script ' + src));
                };
                document.head.appendChild(js);
            },

        /* [ M ] */
        /* [ N ] */
        /* [ O ] */

            onChange: function(el)
            {
                Util.addEventHandler(el, 'change', function()
                {
                    callback();
                });
            },

        /* [ P ] */

            param : function(object)
            {
                var encodedString = '';
                for (var prop in object) {
                    if (object.hasOwnProperty(prop)) {
                        if (encodedString.length > 0) {
                            encodedString += '&';
                        }
                        encodedString += encodeURI(prop + '=' + object[prop]);
                    }
                }
                return encodedString;
            },

            perf : function()
            {
                var perfBar = function(budget) {

                    window.onload = function() {
                        window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};


                        var timing = window.performance.timing,
                        now = new Date().getTime(),
                        output, loadTime;

                        if (!timing) {
                            //fail silently
                            return;
                        }
                        budget = budget ? budget : 1000;
                        var start = timing.navigationStart;

                        var results = document.createElement('div');
                        results.setAttribute('id', 'results');
                        loadTime = now - start;
                        results.innerHTML = (now - start) + "ms";
                        if (loadTime > budget) {
                            results.className += ' overBudget';
                        } else {
                            results.className += ' underBudget';
                        }
                        document.body.appendChild(results);
                    }

                };
                window.perfBar = perfBar;

            },

            preventForm : function(formEl)
            {
                document.querySelector(formEl).addEventListener("submit", function(e){
                    e.preventDefault();    //stop form from submitting
                });
            },

        /* [ Q ] */
        /* [ R ] */

            replaceImage: function(response, el)
            {
                el.setAttribute('style', 'background-image: url('+ response +') center;' );
            },

        /* [ S ] */

            debouncer: function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}},

            getScrollXY: function(){var a=0,b=0;return"number"==typeof window.pageYOffset?(b=window.pageYOffset,a=window.pageXOffset):document.body&&(document.body.scrollLeft||document.body.scrollTop)?(b=document.body.scrollTop,a=document.body.scrollLeft):document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)&&(b=document.documentElement.scrollTop,a=document.documentElement.scrollLeft),[a,b]},

            getDocHeight: function(){var a=document;return Math.max(a.body.scrollHeight,a.documentElement.scrollHeight,a.body.offsetHeight,a.documentElement.offsetHeight,a.body.clientHeight,a.documentElement.clientHeight)},

            /**
        	 * is user on mobile
        	 * @function checks for media device and gets the retina image
        	 */
            serveRetinaDevice: function()
            {


                    if (('devicePixelRatio' in window && window.devicePixelRatio >= 1.5) ||
                        ('matchMedia' in window && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)").matches))
                    if(true)
                    {
            			[].forEach.call(document.querySelectorAll('.backstretch img'), function(el)
            			{
                            console.log('hi');
                            Util.get_images('banner', true,
                            function(p) {
                                el.setAttribute('style', 'background-image: url('+ p +') center;' );
                            });
            			});
                    } else {
                        console.log('Not retina');
                    }

            },

            search_keydown_ajax : function()
        	{
        	    var action = 'fps_search_ajax',
        	    searchForm = document.querySelector('#search__form'),
        	    searchEl = document.querySelector('#search--site');

        	    //prevent submit
        	    //Util.preventForm('#search__form');

        	    // keypress event
        	    searchForm.querySelector('.search__field').addEventListener('keydown', function(event)
        	    {
        	        var zhege = event.target,
        	        searchTerm = zhege.value;

        	        zhege.setAttribute('autocomplete', 'off');

        	        if(searchTerm.length > 2)
        	        {
        	            // JSON
        	            var xhr = new XMLHttpRequest();

        	            xhr.open('PUT', ajax_url + '?action=' +action);
        	            xhr.setRequestHeader('Content-Type', 'application/json');
        	            xhr.onload = function() {
        	                if (xhr.status === 200) {
        	                    var response = xhr.responseText,
        	                    search__results = searchEl.querySelector('#search__results'),
        	                    results__portable = searchEl.querySelector('#search__results--portable');
        	                    // if( $(window).width() > 1350) {
        	                    // } else {
        	                    // }
        						search__results.classList.add('search__results--active');
        						search__results.innerHTML = response;
        	                }
        	                else if (xhr.status !== 200) {
        	                    alert('Request failed.  Returned status of ' + xhr.status);
        	                }
        	            };
        	            xhr.send(JSON.stringify({
        	                action: action,
        	                term: searchTerm
        	            }));
        	        }
        	    });
        	},


        /* [ T ] */
        /* [ U ] */
        /* [ V ] */


    };

    return Utils;
});
