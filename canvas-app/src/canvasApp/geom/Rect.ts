/// <reference path="Point.ts" />
module canvasApp
{
    export class Rect extends canvasApp.Point 
    {
        public width: number = 0;
        public height: number = 0;
        
        constructor(x?: number, y?: number, width?: number, height?: number)
        {
            super(x, y);
            this.width = width || 0;
            this.height = height || 0;
        }
    }

}