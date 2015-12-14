/**
 * @author JSavage
 */

//# require 'core'

//# require 'fsm.core.State'

namespaceProvide("fsm.states");

fsm.states.MoveToPointState = function(point/*:geom.Point*/)
{
    this.to = point;
    
    this.update = function(deltaTime)
    {
        //console.log("MoveToPointState::update()");
        this.target.x += this.to.vx; //(this.to.x - this.target.x) / 10;
        this.target.y += this.to.vy; //(this.to.y - this.target.y) / 10;
        
        //console.log(this.target.x + ", " + this.target.y );
    };
    
};

classExtend(fsm.states.MoveToPointState, fsm.core.State);