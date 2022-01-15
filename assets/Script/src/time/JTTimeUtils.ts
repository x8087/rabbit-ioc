namespace com 
{
    export class JTTimeUtils  
    {
        public static get runnbleTime():number
        {
            return performance.now();
        }

        /**
         * 等下一帧，注意，这里的帧是指浏览器的帧（一般为4MS），而非游戏帧
         */
        public static async runLater() 
        {
            return new Promise(function (resolve) 
            {
                setTimeout(resolve, 0);
            });
        }

        /**
         * 等下一帧，注意，这里的帧是指浏览器的帧（一般为1帧数），而非游戏帧
         */
        public static callLater(fun:Function):void
        {
            let enterFrame:JTIEnterFrame = JTEnterFrame.create();
            enterFrame.addEventListener(JTTimeEvent.ENTER_COMPLETE, onEnterComplete, this);
            enterFrame.play(4, 1)

             function onEnterComplete(e):void
             {
                  fun && fun();
                  fun = null;
                  JTEnterFrame.put(e);
             }
        }
    }
}
