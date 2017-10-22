

    require([ 'Util', 'Mustard' ], function(Util, Mustard)
    {
        var cuts = Mustard.cuts_the_mustard();
        if( cuts == true )
        {
            // Smart Browser
            var allFeatures = 'matches' in Element.prototype && 'classList' in Element.prototype && Util.supportSVG();

            require(['Core', 'App'], function( Core, App )
            {
                if( allFeatures == true )
                {
                    // Supports All Features

                    Util.DOMReady(function()
                    {
                        // runs loading screen then app with a callback which is to close the screen
                        Core.init();
                        App.init();

                    });
                }
                else
                {
                    // Doesn't support one or more features

                    require(['Polyfills'], function()
                    {
                        // Core and App should be AMD loading functionality into the page.
                        Util.DOMReady(function()
                        {
                            Core.init();
                            App.init();
                        });
                    })
                }
            });
        }
         else
        {
            // Feature Browser
            var html = document.getElementsByTagName('html');
            for (var i = 0; i < html.length; i++)
            {
                html[i].setAttribute('class', 'does-not-cut-the-mustard');
            }

            // No JS.
            // Basic version.
            // How to implement simplified version of complex design?
            // Start off with the basic. A basic menu etc,then progressively enhance through AMD
        }

    });
