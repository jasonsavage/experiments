module canvasApp
{
    export class Utils
    {
        public static percentToDecimal(value: string): number
		{
			var i: number = value.indexOf("%");
			if (i != -1)
            {
				value = value.substring(0, i);
            }
				
			var num: number = parseFloat(value);
			num /= 100;
				
			return num;
		}
        
        /**
		 * Returns the value if it is between the values of min and max, else if larger than max returns max and vice versa.
		 * @param	value
		 * @param	min
		 * @param	max
		 * @return
		 */
		public static limit(value: number, min: number, max: number): number
		{
			return Math.max(Math.min(value, max), min);
		}
        
        public static drawRoundedRect(ctx: IContext2d, x: number, y: number, width: number, height: number, radius: number): void
		{
			ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
		}
        
        public static wrapText(ctx: IContext2d, text: string, x: number, y: number, maxWidth: number, lineHeight: number) 
        {
            var words = text.split(' ');
            var line = '';

            for(var n = 0; n < words.length; n++) 
            {
                var testLine = line + words[n] + ' ',
                    metrics = ctx.measureText(testLine),
                    testWidth = metrics.width;
                
                if (testWidth > maxWidth && n > 0) 
                {
                    ctx.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else 
                {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
        }
    }
}