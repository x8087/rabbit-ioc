namespace com 
{
    /**
     * 帧均摊--利用帧频间隔来进行渲染图像/或者计算数据
     * 
     */
    export class JTScheduleFrame extends JTEnterFrame implements JTIScheduleFrame
    {
        private _frames:any[] = null;
        private _createFrames:JTCommand = null;
        constructor()
        {
            super();
        }

        public get currentItem():any
        {
            return this._frames[this._currentTimes - 1 < 0 ? 0 : this._currentTimes - 1];
        }

        public get frames():any[]
        {
            return this._frames;
        }

        public set createFrames(value:JTCommand)
        {
            this._createFrames = value;
        }

        public play(totalFrames:number, loop:number = 0, frameRate:number = 60):void
        {
            this._running = true;
            this.setup(totalFrames, loop, frameRate);
            this._frames = this._createFrames.runWith(totalFrames)
            JTTimerTool.animationTimer.addTask(this);//加入到动画对列里
        }

        recycle(): void {
            super.recycle();
            this._frames = null;
        }
 
        public static create():JTIScheduleFrame
        {
            let frame:JTIScheduleFrame = JTPool.instance(JTScheduleFrame).get() as JTIScheduleFrame;
            return frame;
        } 

        public static put(timer:JTIScheduleFrame):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            JTPool.instance(JTScheduleFrame).put(timer as JTIScheduleFrame);
        }
    }
}
