define(function()
{
    return {
        getParentByClass: function(elem, lookingFor)
        {
            while (elem = elem.parentNode) {
                if (typeof(elem.classList) != "undefined" && elem.classList != '') {
                    if (elem.classList.contains(lookingFor)) {
                        return elem;
                    }
                }
            }
        },

        getParentByTag: function(elem, lookingFor)
        {
            lookingFor = lookingFor.toUpperCase();
            while (elem = elem.parentNode) if (elem.tagName === lookingFor) return elem;
        }
    }
});
