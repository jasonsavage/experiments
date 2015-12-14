module canvasApp
{
    export class TextStyle implements IStyle
    {
        static TEXT_LEFT: string = 'left';
        static TEXT_RIGHT: string = 'right';
        static TEXT_CENTER: string = 'center';
        
        public font: string;
        public size: number;
        public lineHeight: number = 16;
        public align: string;
        public baseline: string = "top";
        public color: string;
        
        constructor(font?: string, size?: number, color?: string, align?: string, lineheight?: number) 
		{
			this.font = font || "Arial,sans-serif";
            this.size = size || 14;
            this.lineHeight = lineheight || 18;
            this.color = color ||  "#ffffff";
            this.align = align || TextStyle.TEXT_LEFT;
        }
    
        public apply(ctx: IContext2d): void
        {
            ctx.font = this.size + "px " + this.font;
            ctx.fillStyle = this.color;
            ctx.textAlign = this.align;
            ctx.textBaseline = this.baseline;
        }
        
        public prop(key: string): any
        {
            return this[key];
        }
    }
}