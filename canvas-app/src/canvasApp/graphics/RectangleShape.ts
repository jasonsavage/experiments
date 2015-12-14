/// <reference path="DrawnShape.ts" />
module canvasApp
{
    export class RectangleShape extends canvasApp.DrawnShape 
    {
        private _cornerRadius: number = 0;
        
        public beginDraw(pt: canvasApp.Point, ctx: IContext2d): void 
        { 
            if(this.fillStyle !== null) 
            {
                this.fillStyle.apply(ctx);	
            }
            
            if(this.borderStyle !== null) 
            {
                this.borderStyle.apply(ctx);	
            }
        }
        
        public draw(pt: canvasApp.Point, ctx: IContext2d): void 
        { 
            if(this._cornerRadius > 0)
            {
                canvasApp.Utils.drawRoundedRect(ctx, pt.x, pt.y, this.width(), this.height(), this._cornerRadius);
                
            }
            else
            {
                ctx.fillRect(
                    pt.x, 
                    pt.y, 
                    this.width(), 
                    this.height()
                );
            }
        }
        
        public endDraw(pt: canvasApp.Point, ctx: IContext2d): void 
        { 
            //fill
            if(this.fillStyle !== null) 
            {
                ctx.fill();
            }

            if(this.borderStyle !== null)
            {
                ctx.stroke();
            }
        }
    }
}