/**
 * @author JSavage
 */

//# require 'core'

namespaceProvide("fsm.core");

fsm.core.StateMachine = function( agent )
{
    //collection of all states
    this.states = [];
    this.agent = agent;
    
    /**
     * Adds a new state to the StateMachine.
     * @param   state
     */
    this.addState = function(state)
    {
        //set state's target
        state.target = this.agent;
        
        //call create to setup state
        state.create();
        
        //add to array
        this.states.push(state);
    };
    
    /**
     * Removes the specified state from the StateMachine.
     * @param   state
     * @param   exitState
     */
    this.removeState = function removeState(state, exitState)
    {
        exitState = exitState || false;
        
        state.phase = (exitState) ? StatePhase.EXIT_PHASE : StatePhase.DESTROY_PHASE;
    };
    
    /**
     * Removes all states from the StateMachine.
     * @param   exitState
     */
    this.removeAllStates = function(exitState)
    {
        exitState = exitState || false;
        
        for (var i = 0; i < this.states.length; i++)
            this.states[i].phase = (exitState) ? StatePhase.EXIT_PHASE : StatePhase.DESTROY_PHASE;
    };
    
    /**
     * Updates all the states on this StateMachine to the correct phase.
     * @param   time
     */
    this.update = function(timer)
    {
        for (var i = 0; i < this.states.length; i++)
        {
            var state = this.states[i];
            
            //sync up time
            state.currentTime = timer.getTime(); 
            
            switch(state.phase)
            {
                case StatePhase.ENTER_PHASE :
                    
                    //call enter
                    state.enterTime = timer.getTime(); 
                    state.enter();
                    
                    //update state phase
                    state.phase = StatePhase.UPDATE_PHASE;
                    
                break;
                
                case StatePhase.UPDATE_PHASE :
                    
                    //update state 
                    state.update(timer.deltaTime);
                    
                    //update state phase if state is no longer valid
                    if (!state.valid)
                        state.phase = StatePhase.EXIT_PHASE;
                        
                break;
                
                case StatePhase.EXIT_PHASE :
                    
                    //call exit
                    state.exit();
                
                //continue to destroy phase
                case StatePhase.DESTROY_PHASE :
                    
                    //call destroy
                    state.destroy();
                    state.target = null;
                    
                    //remove reference from array
                    this.states.splice(i, 1);
                    
                break;
            }
        }
    };
    
};