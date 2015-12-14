/// <reference path="../geom/Point.ts" />
module canvasApp
{
    export class DrawnShape implements IRenderable
    {
        public fillStyle: IStyle = null;
        public borderStyle: IStyle = null;
        
        private _width: number;
        private _height: number;
        
        constructor(width?: number, height?: number)
        {
            this._width = width || 0;
            this._height = height || 0;
        }

        public beginDraw(pt: canvasApp.Point, ctx: IContext2d): void { }
        public draw(pt: canvasApp.Point, ctx: IContext2d): void { }
        public endDraw(pt: canvasApp.Point, ctx: IContext2d): void { }
        
        public render(pt: canvasApp.Point, ctx: IContext2d): canvasApp.Point
        {
            //start
            this.beginDraw(pt, ctx);
            
            //draw
            this.draw(pt, ctx);
            
            //end
            this.endDraw(pt, ctx);
            
            return pt;
        }
        
        public width(value?: number): number
        {
            if(typeof value !== 'undefined') {
                this._width = value;
            }
            return this._width;
        }

        public height(value?: number): number
        {
            if(typeof value !== 'undefined') {
                this._height = value;
            }
            return this._height;
        }

    }
}