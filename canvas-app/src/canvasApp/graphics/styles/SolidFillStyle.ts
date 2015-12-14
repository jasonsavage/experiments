module canvasApp
{
    export class SolidFillStyle implements IStyle
    {
        public color: string;
        public alpha: number;
        
        constructor(color?: string, alpha?: number)
        {
            this.color = color || "#000000";
            this.alpha = alpha || 1;
        }
        
        public apply(ctx: IContext2d): void
        {
            ctx.fillStyle = this.color;
        }
        
        public prop(key: string): any
        {
            return this[key];
        }
    }
}