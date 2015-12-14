/**
 * @author JSavage
 */

//# require 'core'

//# require 'geom.Point'
//# require 'fsm.core.FSMApplication'
//# require 'fsm.core.Agent'
//# require 'fsm.states.MoveToPointState'


var SampleApplication = function(canvas)
{
    this.canvas = canvas;
    this.timer  = new fsm.core.Timer(this);
    
    this.start = function()
    {
        console.log("start!");
        
        var point = new geom.Point(500, 500, 1.5, 0.4);
        var moveState = new fsm.states.MoveToPointState( point );
        
        /*
        var a = new fsm.core.Agent();
        a.skin = new Image();
        a.skin.src = 'img/Angry_Bird_red.png';
        a.addState( moveState );
        a.y = 30;
        a.x = 30;
        this.addAgent( a );
        */
            
        for(var i=0; i < 10; i++)
        {
            for(var j=0; j < 10; j++)
            {
                var a = new fsm.core.Agent();
                a.skin = new Image();
                a.skin.src = 'img/Angry_Bird_red.png';
                //a.addState( moveState );
                a.y = 70 * j;
                a.x = 70 * i;
                this.addAgent( a );
            }
        }
        
        
        //var a = new Circle();
        //a.y = 200;
        //a.x = 200;
        //a.showBorders = true;
        //a.skin = new Image();
        //a.skin.src = 'img/Angry_Bird_red.png';
        
        
        //this.agents.push( a );
        
        
        this.timer.start();
        
        var context = this;
        
        setTimeout(function()
        {
            console.log("end");
            context.timer.stop();
            
        }, 5000);
        
    };
};
classExtend(SampleApplication, fsm.core.FSMApplication);

var Circle = function()
{
    this.skin = function(ctx)
    {
        console.log(this.x + ", " + this.y);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        ctx.closePath();
        
        //draw it!
        ctx.strokeStyle = "#000";
        ctx.stroke();
    };
};
classExtend(Circle, fsm.core.Agent);
