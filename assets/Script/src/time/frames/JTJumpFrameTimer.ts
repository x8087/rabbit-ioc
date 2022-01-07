namespace com 
{
    export class JTJumpFrame extends JTEnterFrame
    {
        private _delayFrames:number = 0;
        constructor(frameRate:number = 60)
        {
            super(1000 / frameRate);
        }

        public get delaysFrame():number
        {
             return this._delayFrames;
        }

        public updateTick(tick:number):void
        {
            this._currentTick += tick; //叠加时间
            let frame:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数
            if (frame > 0) //延迟次数
            {
                let nowFrames:number = this._currentTimes + frame;
                if (nowFrames >= this._totalTimes && this._totalTimes != 0)
                {
                    frame = this._totalTimes - this._currentTimes;
                }
                this._currentTimes += frame;
                this._currentTick -= this._interval * frame;
                this.dispatchEvent(JTTimeEvent.ENTER_FRAME, this);
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
