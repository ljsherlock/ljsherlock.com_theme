define(['Util'], function( Util )
{
    return {
        createList: function(select)
        {
            [].forEach.call(document.querySelectorAll(select), function(el, index, array)
            {
                el.classList.add('custom-select__list--hidden');

                var i, e, v, t,
                items = [],
                obj = {},
                ul = '<ul class="custom-select__list custom-select__list--'+index+'">',
                options = el.getElementsByTagName('option');

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
        }
    }
});
