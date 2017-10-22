define(['Util'], function( Util )
{
    //user is "finished typing," do something
    function doneTyping (callback)
    {
      callback();
    }

    var Events = {
        actionAfterTyping: function(el, callback)
        {
            //setup before functions
            var typingTimer;                //timer identifier
            var doneTypingInterval = 1500;  //time in ms, 5 second for example

            //on keyup, start the countdown
            Util.addEventHandler(el, 'keyup', function()
            {
                clearTimeout(typingTimer);

                typingTimer = setTimeout(function()
                {
                    doneTyping( function()
                    {
                        callback();
                    });
                }, doneTypingInterval );
            });

            return typingTimer;

            //on keydown, clear the countdown
            Util.addEventHandler(el, 'keydown', function() {
              clearTimeout(typingTimer);
            });
        },

        bindOneNeedsPrefixes : {
            animationend: true
        // can add others as needed
        },

        bindOneprefixes : ["webkit", "moz", "ms", "o"],

        bindOne: function (el, evtTypes, callback, captures)
        {
            var allEvents = evtTypes.trim().split(/\s+/)

            allEvents.forEach(function(evtType) {
                var doPrefixes = Events.bindOneNeedsPrefixes[evtType.toLowerCase()]

                if (doPrefixes) {
                    Events.bindOneprefixes.forEach(function(prefix) {
                        el.addEventListener(prefix + evtType, boundFn, captures)
                    })
                }

                el.addEventListener(evtType, boundFn, captures)

                function boundFn() {
                    if (doPrefixes) {
                        Events.bindOneprefixes.forEach(function(prefix) {
                            this.removeEventListener(prefix + evtType, boundFn, captures)
                        }, this)
                    }

                        this.removeEventListener(evtType, boundFn, captures)

                    callback.call(this, event)
                }
            })
        }
    }

    return Events;
});
