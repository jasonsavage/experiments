/// <reference path="../core/LayoutManager.ts" />
/// <reference path="../geom/Point.ts" />
/// <reference path="../graphics/DrawnShape.ts" />
module canvasApp
{
    ///<summary>
    ///The View class handles parent/child relationships between object as well as reporting layout changes to the internal layout manager.
    ///</summary>
    export class View implements IRenderable
    {
        private _parent: View = null;
        
        //layout
        private _invalidateDisplayFlag: boolean = false;
        private _initialized: boolean = false;
        public _nestedLevel: number = 0;
        
        //only child
        private _background: canvasApp.DrawnShape = null;
        
        //positioning
        private _x: number = 0;
        private _y: number = 0;
        private _padding: any = {top : 0, right : 0, bottom : 0, left : 0};
    
        constructor(x?: number, y?: number)
        {
            this._x = x || 0;
            this._y = y || 0;
        }
        
        //a View is mesured based on the size of it's background
        public mesureWidth (): number
        {
            return ((this._background !== null) ? this._background.width() : 0) + this._padding.left + this._padding.right;
        }
        public mesureHeight (): number
        {
            return ((this._background !== null) ? this._background.height() : 0) + this._padding.top + this._padding.bottom;
        }
        
        public invalidateDisplay (): void 
        {
            if(this.parent() !== null || this.parent() === this) 
            {
                if(!this._invalidateDisplayFlag) 
                {
                    //invalid displayList
                    this._invalidateDisplayFlag = true;
                    this.layoutManager().invalidateDisplayList(this, this._nestedLevel);
                }
                
                if(this.parent() !== this){
                    this.parent().invalidateDisplay();
                }
            }
        }
        
        public validateDisplay (): void
        {
            this._invalidateDisplayFlag = false;
        }
        
        public render (pt: canvasApp.Point, ctx: IContext2d): canvasApp.Point
        {
            //update drawing position
            pt = new canvasApp.Point(pt.x + this._x, pt.y + this._y);
            
            //render background if needed
            if(this._background !== null) {
                //update background size so if fills view
                this._background.width( this.mesureWidth() );
                this._background.height( this.mesureHeight() );
                
                this._background.render(pt, ctx);
            }
            
            //save this view's state
            ctx.save(); 
            
            return pt;
        }

        
        /**************************************
         * Accessors
         **************************************/
        
        public x(value?: number): number
        {
            if(typeof value !== 'undefined') {
                this._x = value;
                this.invalidateDisplay();
            }
            return this._x;
        }

        public y(value?: number): number
        {
            if(typeof value !== 'undefined') {
                this._y = value;
                this.invalidateDisplay();
            }
            return this._y;
        }
        
        public padding(top?: number, right?: number, bottom?: number, left?: number): any
        {
            if(typeof top !== 'undefined') {
                this._padding = {top : top, right : top, bottom : top, left : top};
                if(typeof right !== 'undefined') {
                    this._padding.right = right;
                    this._padding.left = right;
                }
                if(typeof bottom !== 'undefined') {
                    this._padding.bottom = bottom;
                }
                if(typeof left !== 'undefined') {
                    this._padding.left = left;
                }
            }
            
            return this._padding;
        }
        
        public parent(value?: View): View
        {
            if(typeof value !== 'undefined') {
                this._parent = value;
            }
            return this._parent;
        }
        
        public background(value?: canvasApp.DrawnShape): canvasApp.DrawnShape
        {
            if(typeof value !== 'undefined') {
                this._background = value;
                this.invalidateDisplay();
            }
            return this._background;
        }
        
        public layoutManager(): canvasApp.LayoutManager
        {
            return LayoutManager.getInstance();
        }
    }
}