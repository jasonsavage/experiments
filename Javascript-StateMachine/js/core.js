/**
 * @author JSavage
 */

//global utilities
// http://davidshariff.com/blog/javascript-inheritance-patterns/
var classExtend = function(childClass, parentClass)
{
    var tmpObj = function() { };
    tmpObj.prototype = new parentClass();
    childClass.prototype = new tmpObj();
    childClass.prototype.constructor = childClass;
};
var namespaceProvide = function(requested)
{
    var parts = requested.split(".");
    var ref = window;
    while(parts.length)
    {
        var p = parts.shift();
        if( !ref.hasOwnProperty(p) )
            ref[p] = {};
        ref = ref[p];
    }
};



//core methods for application
var core = {
    
    

};

//polyfill for requestAnimationFrame
//http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
