///<reference path="../events/JTEventDispatcher.ts"/>
module com 
{
    export abstract class JTAnimation extends JTEventDispatcher
    {
        protected _frames:fgui.Frame[] = null;
        protected _content:fgui.GMovieClip = null;

        protected _enterFrame:JTIEnterFrame = null;
        constructor(content:fgui.GMovieClip, timerTask:JTIEnterFrame)
        {
            super();
            this._content = content;
            this._enterFrame = timerTask;
        }

        public gotoAndStop():void
        {

        }

        
        public gotoAndPlay():void
        {
            
        }

        public play():void
        {

        }

        public stop():void
        {
            
        }
    }
}
