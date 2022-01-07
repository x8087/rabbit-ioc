namespace com 
{
    export class JTJumpFrameTimer extends JTFrameTimer
    {
        constructor(fps:number = 0, loop:number = 0)
        {
            super(1000 / fps, loop);
        }

        public updateTick(tick:number):void
        {
            this._currentTick += tick; //叠加时间
            let count:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数
            if (count > 0) //延迟次数
            {
                let nowCount:number = this._currentCount + count;
                if (nowCount >= this._totalCount && this._totalCount != 0)
                {
                    count = this._totalCount - this._currentCount;
                }
                for (let i:number = 0; i < count; i++)
                {
                    this._currentCount ++;
                    this._currentTick -= this._interval;
                    this.dispatchEvent(JTTimerEvent.TIMER, this);
                }
            }
            if (this._currentCount >= this._totalCount && this._totalCount != 0)
            {
                this.stop();
                this.dispatchEvent(JTTimerEvent.TIMER_COMPLETE, this);
            }
        }
      
        private static _pool:JTIPool = JTPool.instance(JTJumpFrameTimer);

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
