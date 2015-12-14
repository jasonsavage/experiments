module canvasApp
{
    export class LineStyle implements IStyle
    {
        public thickness: number;
        public color: string;
        public cap: string;
        public join: string;
        
        constructor(thickness?: number, color?: string, caps?: string, joints?: string) 
		{
			this.thickness  = thickness || 0;
			this.color      = color || "#000000";
            this.cap    = caps || 'butt';
            this.join   = joints || 'miter';
		}
    
        public apply(ctx: IContext2d): void
        {
            ctx.strokeStyle = this.color;
            ctx.lineWidth   = this.thickness;
            ctx.lineCap     = this.cap;
            ctx.lineJoin    = this.join;
        }
        
        public prop(key: string): any
        {
            return this[key];
        }
    }
}