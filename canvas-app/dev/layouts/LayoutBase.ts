module canvasApp
{
    export class LayoutBase
    {
        //Number or String
		public width: any = null;
		public height: any = null;
		
		public paddingTop: number = 0;
		public paddingRight: number = 0;
		public paddingBottom: number = 0;
		public paddingLeft: number = 0;
        
        /**
		 * Convenience method to set the width and height of this layout.
		 */
        public setSize(w: any, h: any):void
		{
			this.width = w;
			this.height = h;
		}
        
        /**
		 * Convenience method to set the padding of this layout.
		 */
        public setPadding(top?: number, right?: number, bottom?: number, left?: number):void
		{
			this.paddingTop     = top || 0;
			this.paddingRight   = right || 0;;
			this.paddingBottom  = bottom || 0;
			this.paddingLeft    = left || 0;
		}
        
        /**
		 * Called to reposition all children based on their layout properties within their parent view.
		 * @param	view - The view whose children need repositioned.
		 */
		public updateLayout(view: View): void
		{
			
		}
    }
}