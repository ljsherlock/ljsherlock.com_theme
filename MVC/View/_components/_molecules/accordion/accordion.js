

define(['Util'], function( Util )
{
    return {
        // .accordion__button
        init: function(accordion__button)
        {
        	Util.buttonState('.accordion__button', '.accordion__event');

            [].forEach.call(document.querySelectorAll(accordion__button), function(el)
            {
                el.addEventListener('click', function(event)
                {
                    var zhege = this;

                    if(zhege.classList.contains('btn--active'))
                    {
                        zhege.classList.remove('events-overlay--visible');
                        zhege.parentNode.querySelector('.accordion__button').classList.remove('btn--active');
                        zhege.parentNode.querySelector('.accordion__button').classList.add('btn--inactive');
                    } else {
                        zhege.classList.remove('events-overlay--visible');
                        zhege.parentNode.querySelector('.accordion__button').classList.add('btn--active');
                        zhege.parentNode.querySelector('.accordion__button').classList.remove('btn--inactive');
                    }

                });
            });
        }
    }
});
