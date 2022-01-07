namespace com 
{
    export class JTJumpFrame extends JTEnterFrame
    {
        private _delayFrames:number = 0;
        constructor(frameRate:number = 60)
        {
            super(1000 / frameRate, 0, 0);
        }

        public get delaysFrame():number
        {
             return this._delayFrames;
        }

        public updateTick(tick:number):void
        {
            this._currentTick += tick; //叠加时间
            let times:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数
            this._delayFrames = 0;
            if (times > 1) //延迟帧数逻辑处理
            {
                this._delayFrames = times - 1;
                let nowTimes:number = this._currentTimes + times;
                let delayLoops:number = Math.floor(nowTimes / this._totalTimes);
                this._loopTimes += delayLoops;
                if (this._loop == 0) this._currentTimes = nowTimes % this._totalTimes;//当循环次数为0是，需要实时计算最后一帧数
                else
                {
                    if (this._loopTimes >= this._loop)
                    {
                        this._loopTimes = this._loop;
                        this._currentTimes = this._totalTimes;//当循环次数为0是，跳转到最后一帧数
                    }
                    else  this._currentTimes = nowTimes % this._totalTimes;//当循环次数为0是，需要实时计算最后一帧数
                }
                this.dispatchEvent(JTTimeEvent.JUMP_FRAME, this);
                this.dispatchEvent(JTTimeEvent.ENTER_FRAME, this);
                delayLoops >= 1 && this.dispatchEvent(JTTimeEvent.ENTER_LAST_FRAME, this);
                if (this._loopTimes >= this._loop && this._loop != 0)
                {
                    this._currentTick = 0;
                    this._running = false;
                    this.dispatchEvent(JTTimeEvent.ENTER_COMPLETE, this);
                }
                else
                {
                    this._currentTick = this._currentTick % this._interval;//重新更新时间节点
                }
            }   
            else if (times == 1) //正常帧数无需跳帧数
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
                            this.dispatchEvent(JTTimeEvent.ENTER_LAST_FRAME, this);
                            this.dispatchEvent(JTTimeEvent.ENTER_COMPLETE, this);
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
      
        private static _pool:JTIPool = JTPool.instance(JTJumpFrame);

        public static create(interval:number, loop:number):JTITimer
        {
            let timer:JTITimer = this._pool.get() as JTITimer;
            timer.setup(interval, loop);
            return timer;
        } 

        public static put(timer:JTITimer):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            this._pool.put(timer as JTITimer);
        }
    }

}
