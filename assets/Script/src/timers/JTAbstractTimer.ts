namespace com 
{
    export abstract class JTAbstractTimer extends JTEventDispatcher implements JTITimerTask, JTITimer
    {
        protected _currentTick:number = 0;
        protected _interval:number = 0;
        protected _totalCount:number = 0;
        protected _currentCount:number = 0;
        protected _running:boolean = false;
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
             this._running = true;
             JTTimerTool.defaultTimer.addTimerTask(this);
        }

        public stop():void
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

        public get running():boolean
        {
            return this._running;
        }

        recycle() 
        {
            this.removes();
            this._currentCount = this._currentTick = this._interval = this._totalCount = 0;
        }
    }
}
