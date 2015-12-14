/**
 * @author JSavage
 */

//# require 'core'

namespaceProvide("fsm.core");

fsm.core.Timer = function( app )
{
    //default vars
    this.startTime      = 0;
    this.currentTime    = 0;
    this.deltaTime      = 0;
    this.timerId        = 0;
    this.application    = app;
    
    /**
     * Starts the game timer
     */
    this.start = function()
    {
        //set start time
        this.startTime      = +new Date();
        this.currentTime    = this.startTime;
        
        //keep scope
        var context = this;
        
        //run loop
        this.timerId = window.requestAnimationFrame(function loop(time)
        {
            console.log("::loop " + time);
            
            var lastTime = context.currentTime;
            context.currentTime    = +new Date();
            context.deltaTime      = (context.currentTime - lastTime) / 1000;
            
            var agents = context.application.agents,
                canvas = context.application.canvas;
            
            //update the state machine for each agent (physics)
            for( var i = 0, len = agents.length; i < len; i++ )
            {
                var agent = agents[i];
                if( agent !== undefined && agent !== null )
                    agent.machine.update( context );
            }
            
            //render display
            if( canvas !== null )
            {
                var ctx = canvas.getContext("2d");
                
                //clear canvas with fill command
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for( var i = 0, len = agents.length; i < len; i++ )
                {
                    var agent = agents[i];
                    
                    if( agent !== undefined && agent !== null )
                        agent.render( ctx );
                }
            }
            
            //loop
            context.timerId = window.requestAnimationFrame(loop);
        });

    };
    
    /**
     * Stops the game timer
     */
    this.stop = function()
    {
        window.cancelAnimationFrame(this.timerId);
        
        this.startTime      = 0;
        this.currentTime    = 0;
    };
    
    
    /**
     * Gets the current time since the timer started
     */
    this.getTime = function()
    {
        return this.currentTime - this.startTime;   
    };

};