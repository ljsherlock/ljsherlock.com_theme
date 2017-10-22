define(['Util'], function( Util )
{
    var Ajax =
    {
        put: function( url, json, success, fail )
        {
            var xhr = new XMLHttpRequest(),
            str = Object.keys(json).map(function(key)
            {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }).join('&');

            xhr.open('PUT', url + '?' + str );
            xhr.setRequestHeader("Content-Type", "application/json");

            if( json != '' )
            {
                var json_string = JSON.stringify( json );
                xhr.send(json_string);
            }

            xhr.onload = function()
            {
                if (xhr.status === 200)
                {
                    if( typeof success === 'function' ) {
                        success(xhr.responseText);
                    } else {
                        return xhr.responseText;
                    }
                }
                else if (xhr.status !== 200)
                {
                    if( typeof fail === 'function' )
                    {
                        fail();
                    } else {
                        alert('Request failed.  Returned status of ' + xhr.status);
                    }
                }
            };

            return xhr;
        },

        internalLinkBefore : function() {  },

        internalLinks : function()
        {
            var main = document.querySelector('main'),
            site_url = top.location.host.toString();
            var links = document.querySelectorAll("a");

            [].forEach.call(links, function(el)
            {
                var href = el.getAttribute('href');
                if( href !== null && href.match(site_url) && !href.match('mailto:') )
                {
                    if ( !el.classList.contains('internal_link') )
                    {
                        el.classList.add('internal_link');

                        el.addEventListener('click', function(e)
                        {
                            e.preventDefault();

                            var target_url = el.getAttribute('href');
                            var current_url = window.location;

                            if( target_url != current_url )
                            {
                                if(  Ajax.getPage(target_url) != false )
                                {
                                    history.pushState(null, null, target_url);
                                }
                            }

                            e.stopPropagation();
                        });
                    }
                }

            });
        },

        getPageCallback: function() { },

        getPage : function(url)
        {
            Ajax.internalLinkBefore();

            var json_string = JSON.stringify({
                ajax: true
            });

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url );
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(json_string);
            xhr.onload = function()
            {
                if (xhr.status === 200)
                {
                    var response = xhr.responseText;

                    document.title = response.match(/<h1[^>]*>([^<]+)<\/h1>/)[1] + "\u2014" + location.host;

                    Ajax.getPageCallback(response);
                }
                else if (xhr.status !== 200)
                {
                    return false;
                }
            };
        }
    };

    return Ajax;

});
