/// <reference path="View.ts" />
module canvasApp
{
    ///<summary>
    ///The TextView class renders text to the screen
    ///</summary>
    export class TextView extends canvasApp.View
    {
        private _textStyle: IStyle = new canvasApp.TextStyle();
        private _text: string = '';
        private _bounds: canvasApp.Rect = null;
        
        constructor(x?: number, y?: number, text?: string)
        {
            super(x, y);
            this._text = text;
        }
        
        //The text view is mesured based on the text that is contained inside the view
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
            this._bounds = new canvasApp.Rect();
            
            if(this._text !== '') {
                var ctx = canvasApp.Application.getContext2d();
                this._textStyle.apply(ctx);
                var metrics = ctx.measureText(this._text);
                this._bounds.width = metrics.width;
                this._bounds.height = this._textStyle.prop('size');
            }
        }

        public render(pt: canvasApp.Point, ctx: IContext2d): canvasApp.Point
        {
            pt = super.render(pt, ctx);
            
            pt.x += this.padding().left;
            pt.y += this.padding().top;
            
            //render text if needed
            if(this._text !== '') {
                this._textStyle.apply(ctx);
                ctx.fillText(this._text, pt.x, pt.y);
            }
            
            //save this view's state
            ctx.save(); 
            
            return pt;
        }

        
        /**************************************
         * Accessors
         **************************************/
        
        public text(value?: string): string
        {
            if(typeof value !== 'undefined') {
                this._text = value;
                this.invalidateDisplay();
            }
            return this._text;
        }
        
        public textStyle(value?: IStyle): IStyle
        {
            if(typeof value !== 'undefined') {
                this._textStyle = value;
                this.invalidateDisplay();
            }
            return this._textStyle;
        }
    }
}