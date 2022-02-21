module com 
{
    export abstract class JTTimerTask extends JTEventDispatcher implements JTITimerTask
    {
        protected _currentTick:number = 0;
        protected _interval:number = 0;
        protected _totalTimes:number = 0;
        protected _currentTimes:number = 0;
        protected _running:boolean = false;
        constructor(interval:number = 0, loop:number = 0)
        {
            super();
            this._interval = interval;
            this._totalTimes = loop;
        }

        public reset():void
        {
            this._currentTimes = 0;
        }

        public updateTick(tick:number):void
        {
            this._currentTick += tick; //叠加时间
            let count:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数
            if (count > 0) //延迟次数
            {
                let nowCount:number = this._currentTimes + count;
                if (nowCount >= this._totalTimes && this._totalTimes != 0)
                {
                    count = this._totalTimes - this._currentTimes;
                }
                for (let i:number = 0; i < count; i++)
                {
                    this._currentTimes ++;
                    this._currentTick -= this._interval;
                    this.dispatch(JTTimeEvent.TIMER, this);
                }
            }
            if (this._currentTimes >= this._totalTimes && this._totalTimes != 0)
            {
                this._running = false;
                this.dispatch(JTTimeEvent.TIMER_COMPLETE, this);
            }
        }

      

        public get running():boolean
        {
            return this._running;
        }
 
        recycle() 
        {
            this.removes();
            this._currentTimes = this._currentTick = this._interval = this._totalTimes = 0;
            this._running = false;
        }
    }
}
