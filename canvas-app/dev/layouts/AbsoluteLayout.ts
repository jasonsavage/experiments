/// <reference path="FrameLayout.ts" />
module canvasApp
{
    /**
	 * The AbsoluteLayout class arranges all of the children of a view based on their layout params.
	 * @author Jason Savage
	 */
    export class AbsoluteLayout extends canvasApp.FrameLayout
    {
        
        public top: number = null;
        public right: number = null;
        public bottom: number = null;
        public left: number = null;
        
        private horizontalCenter: number = null;
        private verticalCenter: number = null;
        
		public positionChild(view: canvasApp.View, child: canvasApp.View, pt: canvasApp.Point): canvasApp.Point
		{
            //add padding if needed
            if(child.x() === 0) child.x(this.paddingLeft);
            if(child.y() === 0) child.y(this.paddingTop);

            if (this.top !== null)
            {
                child.y( this.top + this.paddingTop );
            }

            if (this.left !== null)
            {
                child.x( this.left + this.paddingLeft );
            }

            if (this.bottom !== null)
            {
                child.y( (view.measureHeight() - child.measureHeight()) - this.bottom - this.paddingBottom );
            }

            if (this.right !== null)
            {
                child.x( (view.measureWidth() - child.measureWidth()) - this.right - this.paddingRight );
            }

            if (this.horizontalCenter !== null)
            {
                child.x( (view.measureWidth() - child.measureWidth() * 0.5) + this.horizontalCenter );
            }

            if (this.verticalCenter !== null)
            {
                child.y( (view.measureHeight() - child.measureHeight() * 0.5) + this.verticalCenter );
            }
            
            return pt;
		}

    }
}