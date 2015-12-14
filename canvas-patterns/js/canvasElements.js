canvasElements = (function () {

    function Line (x, y, toX, toY, color) {
        this.x = x;
        this.y = y,
        this.toX = toX;
        this.toY = toY;
        this.color = color;

        this.draw = function (startX, startY, ctx) {
            ctx.beginPath();
            ctx.moveTo(startX + this.x, startY + this.y);
            ctx.lineTo(startX + this.toX, startY + this.toY);
            ctx.strokeStyle = this.color;
            ctx.stroke();
        };
    }

    function Rect (x, y, width, height, color) {
        this.x = x;
        this.y = y,
        this.width = width;
        this.height = height;
        this.color = color;

        this.draw = function (startX, startY, ctx) {
            ctx.beginPath();
            ctx.rect(startX + this.x, startY + this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fill();
        };
    }

    function Circ (x, y, radius, color) {
        this.x = x;
        this.y = y,
        this.radius = radius;
        this.color = color;

        this.draw = function (startX, startY, ctx) {
            ctx.beginPath();
            ctx.arc(startX + this.x, startY + this.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        };
    }


    return {
        Line : Line,
        Rect : Rect,
        Circ : Circ
    };
}());
