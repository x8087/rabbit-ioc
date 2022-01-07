namespace com 
{
    export class JTFrameTimer extends JTTimeTask
    {
        private _frameRate:number = 0;

        constructor(frameRate:number = 0, loop:number = 0)
        {
            super(1000 / frameRate, loop);
            this._frameRate = frameRate;
        }

        public get frameRate():number
        {
            return this._frameRate;
        }

        public play():void
        {
            this._running = true;
            JTTimerTool.animationTimer.addTimerTask(this);
        }

        public stop():void
        {
            this._running = false; 
        }

        public pause():void
        {
            this._running = false; 
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
      
    }

}
