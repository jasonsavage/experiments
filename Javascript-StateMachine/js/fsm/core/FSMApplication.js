/**
 * @author JSavage
 */

//# require 'core'
//# require 'fsm.core.Timer'

namespaceProvide("fsm.core");

fsm.core.FSMApplication = function()
{
    this.canvas = null;
    this.agents = [];
    this.timer  = null;

    this.addAgent = function(agent)
    {
        //add to array of agents
        this.agents.push(agent);
    };
    
    this.removeAgent = function(agent)
    {
        //remove agent from array
        this.agents.splice( this.agents.indexOf(agent), 1);
        
        //destory agent
        agent.destroy();
    };
};