/// <reference path="LayoutBase.ts" />
module canvasApp
{
    /**
	 * The FrameLayout class is the base class for all layouts. 
	 * It arranges all of the children of a view at the top left corner on top of each other.
	 * @author Jason Savage
	 */
    export class FrameLayout extends canvasApp.LayoutBase
    {
       
    
		public updateLayout(view: canvasApp.View): void
		{
			var pt: canvasApp.Point = this.getStartPoint(view);
			for (var i: number = 0; i < view.numChildren(); i++)
			{
				pt = this.positionChild(view, view.childAt(i), pt);
			}
		}
        
        public getStartPoint(view: canvasApp.View): canvasApp.Point
		{
			return new canvasApp.Point(this.paddingLeft, this.paddingTop);
		}

        /**
		 * Called on each child to position it and returns the next point.
		 * @param	child
		 * @param	pt
		 * @return
		 */
		public positionChild(view: canvasApp.View, child: canvasApp.View, pt: canvasApp.Point): canvasApp.Point
		{
			child.x( pt.x() );
			child.y( pt.y() );
			
			return pt;
		}

    }
}