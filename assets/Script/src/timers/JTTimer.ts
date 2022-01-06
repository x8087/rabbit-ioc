namespace com 
{
    export class JTTimer extends JTAbstractTimer
    {
        constructor(interval:number = 0, loop:number = 0)
        {
            super();
            this.setup(interval, loop);
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
