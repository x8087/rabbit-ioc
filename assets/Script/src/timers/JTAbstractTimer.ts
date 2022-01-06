namespace com 
{
    export abstract class JTAbstractTimer extends JTEventDispatcher implements JTITimerTask, JTITimer
    {
        protected _delay:number = 0;
        protected _interval:number = 0;
        protected _totalCount:number = 0;
        protected _currentCount:number = 0;
        constructor(interval:number = 0, loop:number = 0)
        {
            super();
            this.setup(interval, loop);
        }

        public setup(interval:number, loop:number = 0):void
        {
            this.reset();
            this._totalCount = loop;
            this._interval = interval;
        }

        public reset():void
        {
            this._currentCount = 0;
        }

        public start():void
        {

        }

        public stop():void
        {

        }

        public updateTick(tick:number):void
        {
            this._delay += tick - this._interval; //叠加延迟
            let delayCount:number = Math.floor(this._delay / this._interval);//取最小延迟次数
            this._currentCount ++;
            this.dispatchEvent(JTTimerEvent.TIMER);
            if (delayCount > 0) //延迟次数
            {
                this._delay -= this._interval * delayCount;
                if (this._currentCount + delayCount >= this._totalCount && this._totalCount != 0)
                {
                    delayCount = this._totalCount - this._currentCount;
                }
                for (let i:number = 0; i < delayCount; i++)
                {
                    this._currentCount ++;
                    this.dispatchEvent(JTTimerEvent.TIMER);
                }
            }
            if (this._currentCount >= this._totalCount && this._totalCount != 0)
            {
                    this.stop();
                    this.dispatchEvent(JTTimerEvent.TIMER_COMPLETE);
            }
        }

        public get totalCount():number
        {
            return this._totalCount;
        }

        public set totalCount(value:number)
        {
            this._totalCount = value;
        }

        public get currentCount():number
        {
            return this._currentCount;
        }

        public set currentCount(value:number)
        {
            this._currentCount = value;
        }

        public get interval():number
        {
            return this._interval;
        }

        public set interval(value:number)
        {
            this._interval = value;
        }

        recycle() 
        {
            this.removes();
            this._currentCount = this._delay = this._interval = this._totalCount = 0;
        }
    }
}
