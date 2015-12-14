Pen = (function(){

    function Pen(lineWidth, color) {

        this.draw = function (ctx) {
            this.forEach(function (cmd) {
                cmd(ctx);
            });
        };

        this.applyLineStyle = function(ctx){
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
        }
    }
    Pen.prototype = new Array();

    return Pen;

}());
