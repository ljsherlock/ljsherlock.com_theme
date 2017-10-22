define([function()
{

    /**
    * @name button_click
    * @function Default action for buttons: Add classes for button status
    */

    button_click : function(button, overlay)
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

});
