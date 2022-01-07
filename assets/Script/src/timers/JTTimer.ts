namespace com 
{
    export class JTTimer extends JTTimeTask implements JTITimer
    {
        constructor(interval:number = 0, loop:number = 0)
        {
            super(interval, loop);
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

      
        private static _pool:JTIPool = JTPool.instance(JTTimer);

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
