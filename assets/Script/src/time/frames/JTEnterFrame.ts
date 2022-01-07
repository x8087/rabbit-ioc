namespace com 
{
    //传统帧事件
    export class JTEnterFrame extends JTTaskTimer implements JTIEnterFrame
    {
        protected _frameRate:number = 0;
        protected _loop:number = 0;
        protected _loopTimes:number = 0;
        constructor(frameRate:number, totalFrames:number, loop:number = 0)
        {
            super(1000 / frameRate, totalFrames);
            this.setup(frameRate, totalFrames, loop);
        }

        public get loop():number
        {
            return this._loop;
        }

        public get frameRate():number
        {
            return this._frameRate;
        }

        public setup(frameRate:number, totalFrames:number, loop:number = 1):void
        {
            this._loopTimes = 0;
            this._loop = loop;
            this._frameRate = frameRate;
            this._totalTimes = totalFrames;
            this._interval = 1000 / frameRate;
        }

        public play(frameRate:number, totalFrames:number, loop:number = 1):void
        {
            this._running = true;
            this.setup(frameRate, totalFrames, loop);
            JTTimerTool.animationTimer.addTask(this);//加入到动画对列里
        }

        public gotoAndPlay(frameRate:number, loop:number = 1):void
        {

        }

        public gotoAndStop():void
        {

        }

        public stop():void
        {
            this._running = false; 
        }

        public pause():void
        {
            this._running = false; 
        }

        public get currentLoop():number
        {
            return this._loopTimes;
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
                    if (this._currentTimes >= this._totalTimes)
                    {
                        this._loopTimes ++;
                        if (this._loop == 0)this._currentTimes = 0;
                        else
                        {
                            if (this._loopTimes >= this._loop && this._loop != 0)
                            {
                                this._running = false;
                                this.dispatchEvent(JTTimeEvent.ENTER_COMPLETE, this);
                                break;
                            }
                            else
                            {
                                this._currentTimes = 0;
                                this.dispatchEvent(JTTimeEvent.ENTER_LAST_FRAME, this);
                            }
                        }
                    }
                }
            }
        }

        public static create(frameRate:number, totalFrames:number, loop:number):JTITimer
        {
            let timer:JTITimer = JTPool.instance(JTEnterFrame).get() as JTITimer;
            timer.setup(frameRate, loop);
            return timer;
        } 

        public static put(timer:JTITimer):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            JTPool.instance(JTEnterFrame).put(timer as JTITimer);
        }
    }

}
