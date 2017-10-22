define([''], function()
{
    return {
        ajaxLinks : function( documentMainStr, before, after )
        {
            var documentMain = document.querySelector(documentMainStr),
            site_url = 'http://' + top.location.host.toString(),
            internal_links = document.querySelectorAll("a[href^='" + site_url +"']");

            // Add call to the links so that we only target internal links.
            internal_links.classList.add('internal_links');

            [].forEach.call(internal_links, function(el)
            {
                el.classList.add('internal_link');
                el.addEventListener('click', function(event)
                {
                    event.preventDefault();

                    // Callback before
                    before();

                    var url = el.getAttribute('href'),
                    json_string = JSON.stringify({ ajax: true }),
                    xhr = new XMLHttpRequest();

                    // Open the url from the link
                    // Send ajax true property so the template does not return the
                    // whole HTML.
                    xhr.open('PUT', url );
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(json_string);
                    xhr.onload = function()
                    {
                        if (xhr.status === 200)
                        {
                            var response = xhr.responseText;
                            documentMain.innerHTML = response;

                            after();
                        }
                        else if (xhr.status !== 200)
                        {
                            alert('Request failed.  Returned status of ' + xhr.status);
                        }
                    };

                });
            });
        },
    }
});
