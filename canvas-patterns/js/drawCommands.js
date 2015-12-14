drawCommands = (function(){

    function tri(x, y, w, h, center) {
        return function(ctx) {

            if(center) {
                ctx.moveTo(x, y - (h * 0.5));
                ctx.lineTo(x - (w * 0.5), y + (h * 0.5));
                ctx.lineTo(x + (w * 0.5), y + (h * 0.5));
            }
            else
            {
                ctx.moveTo(x + (w * 0.5), y);
                ctx.lineTo(x + w, y + h);
                ctx.lineTo(x, y + h);
            }
            ctx.closePath();
        }
    }

    return {
        tri : tri
    }

}());
