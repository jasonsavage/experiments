module canvasApp
{
    export class LayoutManager 
    {
        public static _instance: LayoutManager;
        
        public static getInstance(): LayoutManager
        {
            return LayoutManager._instance;
        }
        
        private _validatePendingFlag: boolean;
        private _invalidateDisplayListQueue: Array<Array<canvasApp.View>> = [];
        private _renderMethod: Function = function (): void { };

        constructor(renderMethod) {
            this._renderMethod = renderMethod;
            LayoutManager._instance = this;
        }
        
        public invalidateDisplayList(component: View, nestedLevel: number): void
		{
            console.log('+ invalidateDisplayList()');

			if (!this._invalidateDisplayListQueue[nestedLevel])
				this._invalidateDisplayListQueue[nestedLevel] = [];
			
			//check if the component is listed under that level
			if (this._invalidateDisplayListQueue[nestedLevel].indexOf(component) === -1)
				this._invalidateDisplayListQueue[nestedLevel].push(component);
			
			//start timer
			this.startTimeout();
		}
        
        /**************************************
		 * Private
		 **************************************/
		
		public startTimeout(): void
		{
			if (!this._validatePendingFlag)
			{
                console.log('+ startTimeout() : ! _validatePendingFlag');
                
				this._validatePendingFlag = true;
                var ctx = this;
				setTimeout(function (): void {
                    ctx.validate();
                }, 20);
			}
		}
		 
		private validate(): void
		{
            console.log('+ validate()');
            
			//validate all Display lists
			this.validateDisplayLists();
            
			//reset queue
			this._invalidateDisplayListQueue.length = 0;
			
			//set pending flag to false
			this._validatePendingFlag = false;
            
            //redraw display
            this._renderMethod();
		}
		
		/**
		 * Calls <code>updateDisplayList()</code> on all components in the DisplayList Queue 
		 * moving from most nested to least
		 */
		private validateDisplayLists(): void
		{
			console.log("+ validateDisplayLists() ----------------------");
			var i: number = this._invalidateDisplayListQueue.length;
			while(i--)
			{
				console.log("validate nestedLevel " + i);
				var queue: Array<canvasApp.View> = this._invalidateDisplayListQueue[i];
				if (!queue) continue;
				for (var j: number = 0; j < queue.length; j++ )
				{
                    console.log("validate child at " + j);
					//update all children at this level
					queue[j].validateDisplay();
				}
			}
            console.log("+ validateDisplayLists() : complete -----------");
		}
        
    }
}