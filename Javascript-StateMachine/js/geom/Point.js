/**
 * @author JSavage
 */

//# require 'core'

namespaceProvide("geom");

geom.Point = function(x, y, vx, vy)
{
    this.x  = x;
    this.y  = y;
    this.vx = vx || 0;
    this.vy = vy || 0;
};