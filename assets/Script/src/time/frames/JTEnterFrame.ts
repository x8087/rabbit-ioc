namespace com 
{
    //传统帧事件
    export class JTEnterFrame extends JTTaskTimer implements JTIFrameTimer
    {
        private _frameRate:number = 0;
        private _loop:number = 0;
        constructor(frameRate:number, totalFrames:number, loop:number = 0)
        {
            super(1000 / frameRate, 0);
            this._loop = loop;
            this._totalTimes = totalFrames;
            this._frameRate = frameRate;
        }

        public get loop():number
        {
            return this._loop;
        }

        public get frameRate():number
        {
            return this._frameRate;
        }

        public setup(frameRate:number, totalFrames:number, loop:number = 0):void
        {
            this._loop = loop;
            this._frameRate = frameRate;
            this._totalTimes = totalFrames;
            this._interval = 1000 / 60;
        }

        public play(frameRate:number, totalFrames:number, loop:number = 0):void
        {
            this._running = true;
            this.setup(frameRate, totalFrames, loop);
            JTTimerTool.animationTimer.addTask(this);//加入到动画对列里
        }

        public stop():void
        {
            this._running = false; 
        }

        public pause():void
        {
            this._running = false; 
        }

        public get currentFrame():number
        {
            return this._currentTimes;
        }

        public get totalFrame():number
        {
            return this._totalTimes;
        }

        public updateTick(tick:number):void
        {
            this._currentTick += tick; //叠加时间
            let count:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数
            if (count > 0) //延迟次数
            {
                for (let i:number = 0; i < count; i++)
                {
                    this._currentTimes ++;
                    this._currentTick -= this._interval;
                    this.dispatchEvent(JTTimeEvent.ENTER_FRAME, this);
                }
            }
            if (this._currentTimes >= this._totalTimes && this._totalTimes != 0)
            {
                 this._currentTimes = 0;
            }
        }
      
    }

}
