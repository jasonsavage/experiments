/// <reference path="View.ts" />
/// <reference path="../geom/Rect.ts" />
module canvasApp
{
    ///<summary>
    ///The ViewGroup class handles parent/child relationships between object.
    ///</summary>
    export class ViewGroup extends canvasApp.View
    {

        private _layout: ILayout = canvasApp.Absolute

        //parent/child relationship
        private _children: Array<View> = [];
        private _bounds: canvasApp.Rect = null;


        //a ViewGroup is mesured based on the size of all it's children
        public mesureWidth (): number
        {
            return (this._bounds !== null ? this._bounds.width : 0) + this.padding().left + this.padding().right;
        }
        public mesureHeight (): number
        {
            return (this._bounds !== null ? this._bounds.height : 0) + this.padding().top + this.padding().bottom;
        }

        public validateDisplay (): void
        {
            super.validateDisplay();

            //pre-calulate size
            var bounds = new canvasApp.Rect();
            this._children.forEach(function (view) {
                bounds.width = Math.max(bounds.width, view.mesureWidth());
                bounds.height = Math.max(bounds.height, view.mesureHeight());
            });
            this._bounds = bounds;
        }

        public addChild (view: View ): View
        {
            return this.addChildAt(view, this._children.length);
        }

        public addChildAt (view: View, index: number): View
        {
            console.log('addChildAt', index, this._children.length);

            if(index <= this._children.length)
            {
                this.removeChild(view);

                //set parent
                view.parent(this);
                view._nestedLevel = this._nestedLevel + 1;

                //TODO: update width & height

                //add view to display list
                this._children[index] = view;

                //invalidate the child view's display list
                view.invalidateDisplay();
            }

            return view;
        }

        public removeChild (view: View): View
        {
            return this.removeChildAt(this._children.indexOf(view));
        }

        public removeChildAt (index: number): View
        {
            console.log('removeChildAt', index, this._children.length);

            if( index >= 0 && index <= this._children.length)
            {
                //remove view from display list
                var view = this._children.splice(index, 1).pop();
                view.parent(null);

                this.invalidateDisplay();

                return view;
            }

            return null;
        }

        public removeAllChildren (): void
        {
            this._children.forEach(function (child) :void {
                child.parent(null);
            });

            this._children.length = 0;

            this.invalidateDisplay();
        }

        public render(pt: canvasApp.Point, ctx: IContext2d): canvasApp.Point
        {
            pt = super.render(pt, ctx);

            this._layout.update(pt, this._children);

            pt.x += this.padding().left;
            pt.y += this.padding().top;

            //render this viewGroup's children
            this._children.forEach(function (childView: View): void {
                childView.render(pt, ctx);
            });

            //save this view's state
            ctx.save();

            return pt;
        }

        /**************************************
         * Accessors
         **************************************/

        public numChildren (): number
        {
            return this._children.length;
        }
    }
}
