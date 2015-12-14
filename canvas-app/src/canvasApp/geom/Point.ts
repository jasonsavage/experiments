module canvasApp
{
    export class Point 
    {
        public x: number = 0;
        public y: number = 0;
        
        constructor(x?: number, y?: number)
        {
            this.x = x || 0;
            this.y = y || 0;
        }
    }
}