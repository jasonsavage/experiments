/// <reference path="canvasApp/interfaces/ICanvas.ts" />
/// <reference path="canvasApp/display/View.ts" />
module canvasApp
{ 
    export class Application
    {
        public static startup(width: number, height: number): canvasApp.View
        {
            //create the canvas object
            var canvas: ICanvas = <ICanvas>document.createElement('canvas');
            canvas.width    = width;
            canvas.height   = height;
            document.body.appendChild(<any>canvas);
            
            canvasApp.Application._canvas = canvas;
            
            //create top level view
            var rootView: canvasApp.ViewGroup = new canvasApp.ViewGroup();
            rootView.parent(rootView);
            
            //create LayoutManager
            var layoutManager = new canvasApp.LayoutManager(function (): void {

                console.log("< render!");
                var begin = new Date().getMilliseconds();
                
                //get context
                var ctx: IContext2d = canvas.getContext('2d');
                
                //clear canvas
                ctx.clearRect(0 , 0 , canvas.width , canvas.height );
                
                //render rootView and all child views
                rootView.render(new canvasApp.Point(0,0), ctx);
                
                var end = new Date().getMilliseconds();
                console.log("> renderComplete " + (end - begin) + "ms");
            });
            
            //return top level display object to build application off of
            return rootView;
        }
        
        public static _canvas: ICanvas;
        
        public static getContext2d () {
            return canvasApp.Application._canvas.getContext('2d');
        }
    }

}




