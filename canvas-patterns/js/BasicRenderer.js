BasicRenderer = (function () {

    function BasicRenderer() {
        this.layers = [];
        this.backgroundColor = "#000000";

        //create the canvas object
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
    };

    BasicRenderer.prototype.reset = function() {
        this.layers.length = 0;
    };

    BasicRenderer.prototype.add = function(child, layerIndex) {
        child.layer = layerIndex || 0;
        while(child.layer >= this.layers.length) {
            this.layers.push(createLayer());
        }
        this.layers[child.layer].push(child);
    };

    BasicRenderer.prototype.remove = function(child) {
        var idx = this.layers[child.layer].indexOf(child);
        this.layers[child.layer].splice(idx, 1);
    };

    BasicRenderer.prototype.draw = function() {

        //get context
        var ctx = this.canvas.getContext('2d');

        //fill screen with background color
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.layers.forEach(function (layer) {
            ctx.translate(layer.x, layer.y);
            layer.forEach(function (child) {

                //start draw
                ctx.beginPath();
                //draw child
                child.draw(ctx);
                //end draw
                ctx.closePath();
                //apply fill style
                if(child.applyFillStyle) {
                    child.applyFillStyle(ctx);
                    ctx.fill();
                }
                //apply line style
                if(child.applyLineStyle) {
                    child.applyLineStyle(ctx);
                    ctx.stroke();
                }
            });
        });
    };

    function createLayer() {
        var l = [];
        l.x = l.y = 0;
        return l;
    }

    return BasicRenderer;
}());
