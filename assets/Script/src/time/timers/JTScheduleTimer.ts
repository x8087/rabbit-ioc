module com 
{
    export class JTScheduleTimer extends JTTimer implements JTIScheduleTimer
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
            this._totalTimes = this._dataList.length;
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
 
        public static create(interval:number, loop:number = 0):JTIScheduleTimer
        {
            let timer:JTIScheduleTimer = JTPool.instance(JTScheduleTimer).get() as JTIScheduleTimer;
            timer.setup(interval, loop);
            return timer;
        } 

        public static put(timer:JTITimer):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            JTPool.instance(JTScheduleTimer).put(timer as JTScheduleTimer);
        }
    }
}
