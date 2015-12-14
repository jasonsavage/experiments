/**
 * @author JSavage
 */

//# require 'core'

namespaceProvide("fsm.core");

var StatePhase = {
    ENTER_PHASE     : 1,
    UPDATE_PHASE    : 2,
    EXIT_PHASE      : 3,
    DESTROY_PHASE   : 4
};

fsm.core.State = function()
{
    //set defaults
    this.target = null;
    this.phase  = StatePhase.ENTER_PHASE;
    this.valid  = true;
    this.currentTime = 0;
    this.enterTime   = 0;
    
    /**
     * Called at the very beginning of the SimpleState's lifecycle. 
     * Most of the time it's better to override enter.
     */
    this.create = function() { };
    
    /**
     * Called during the next cycle when the state is added to a target.
     * @param   time
     */
    this.enter = function() { };
    
    /**
     * Called in a loop after <code>enter(int)</code> has been called until 
     * this state becomes invalid or is removed from target. 
     * @param   time
     */
    this.update = function(deltaTime) { };
    
    /**
     * Called during the next cycle when the state becomes invalid.
     * If a state is removed from an object exit isn't called.
     * @param   time
     */
    this.exit = function() { };
    
    /**
     * Called at the end of the State's lifecycle. 
     * Override to clean up any references and/or listeners.
     */
    this.destroy = function() { };
    
    
    /**************************************
     * Accessors
     **************************************/
    
    this.getStateTime = function()
    { 
        return this.currentTime - this.enterTime; 
    };
};