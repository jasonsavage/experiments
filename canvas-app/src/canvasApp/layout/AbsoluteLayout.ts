/// <reference path="../display/ViewGroup.ts" />
module canvasApp
{
    export class AbsoluteLayout implements ILayout
    {
        /**
         * Called to reposition all children based on their layout properties within their parent view.
         * @param   view - The view whose children need repositioned.
         */
        public update(pt, viewGroup:ViewGroup): void
        {
            pt.x += viewGroup.padding().left;
            pt.y += viewGroup.padding().top;

            //render this viewGroup's children
            viewGroup.children().forEach(function (childView: View): void {
                childView.render(pt, ctx);
            });
        }
    }
}
