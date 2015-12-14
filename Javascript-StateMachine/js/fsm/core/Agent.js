/**
 * @author JSavage
 */

//# require 'core'
//# require 'fsm.core.StateMachine'

namespaceProvide("fsm.core");

fsm.core.Agent = function()
{
    this.machine = new fsm.core.StateMachine(this);
    
    this.skin   = null;
    this.visible= true;
    this.scaleX = 1;
    this.scaleY = 1;
    this.x      = 0;
    this.y      = 0;
    this.showBorders = false;
    
    //shortcut methods
    this.addState = function(state)
    {
        this.machine.addState(state);
    };
    
    this.removeState = function(state)
    {
        this.machine.removeState(state);
    };
  
    this.render = function(context2d)
    {
        if (this.skin != null && this.visible)
        {
            //skin can be an image or a method
            if( typeof this.skin === 'function' )
            {
                this.skin(context2d);
            }
            else
            {
                //assume image
                context2d.drawImage(this.skin, this.x, this.y, this.skin.width * this.scaleX, this.skin.height * this.scaleY);
            }
        }
        
        if (this.showBorders)
        {
            context2d.strokeStyle = '#ff0028';
            context2d.strokeRect(this.x, this.y, this.skin.width * this.scaleX, this.skin.height * this.scaleY);
        }
    };
    
    this.destroy = function()
    {
    };
    
};