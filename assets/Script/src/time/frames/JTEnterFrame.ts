module com 
{
    //传统帧事件
    export class JTEnterFrame extends JTTimerTask implements JTIEnterFrame
    {
        protected _frameRate:number = 0;
        protected _loop:number = 0;
        protected _loopTimes:number = 0;
        protected SECOND_INTERVAL:number = 1000;
        protected DEFAULT_FRAME_RATE:number = 60;
        protected DEFAULT_FRAME_RATE_TIME:number = 16;
        constructor()
        {
            super(0, 0);
        }

        public get loop():number
        {
            return this._loop;
        }

        public get frameRate():number
        {
            return this._frameRate;
        }

        public setup(totalFrames:number, loop:number = 0, frameRate:number = 60):void
        {
            this._loopTimes = 0;
            this._loop = loop;
            this._totalTimes = totalFrames;
            this.adjustFrameRate(frameRate);
        }

        public play(totalFrames:number, loop:number = 0, frameRate:number = 60):void
        {
            this._running = true;
            this.setup(totalFrames, loop, frameRate);
            JTTimerTool.animationTimer.addTask(this);//加入到动画对列里
        }

        protected adjustFrameRate(value:number):void
        {
            this._interval = value  == this.DEFAULT_FRAME_RATE ? this.DEFAULT_FRAME_RATE_TIME : this.SECOND_INTERVAL / value;
            this._frameRate = value;
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
            let count:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数-不进行四舍五入，也不直接上向补位，把时间节点留到下次叠加
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

        public static create():JTIEnterFrame
        {
            let timer:JTIEnterFrame = JTPool.instance(JTEnterFrame).get() as JTIEnterFrame;
            return timer;
        } 

        public static put(timer:JTIEnterFrame):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            JTPool.instance(JTEnterFrame).put(timer as JTIEnterFrame);
        }
    }

}
