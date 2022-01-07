namespace com 
{
    //
    export class JTScheduleTimer extends JTTimeTask
    {
        private _dataList:any[] = null;
        constructor(interval:number = 0, dataList:any[])
        {
            super(interval, dataList.length);
            this._dataList = dataList;
        }

        
        public setup(interval:number):void
        {
            this.reset();
            this._totalCount = this._dataList.length;
            this._interval = interval;
        }

        public get currentItem():any
        {
            return this._dataList[this.currentCount - 1];
        }

        public get dataList():any[]
        {
            return this._dataList;
        }

        recycle(): void {
            super.recycle();
            this._dataList = null;
        }

        private static _pool:JTIPool = JTPool.instance(JTScheduleTimer);

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
