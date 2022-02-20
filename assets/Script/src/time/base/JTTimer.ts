///<reference path="JTTimerTask.ts"/>
module com 
{
    export class JTTimer extends JTTimerTask implements JTITimer
    {
        constructor(interval:number = 0, loop:number = 0)
        {
            super(interval, loop);
        }

        public setup(interval:number, loop:number = 0):void
        {
            this.reset();
            this._totalTimes = loop;
            this._interval = interval;
        }

        public loop(interval:number, listener:Function, caller:any):void
        {
            this.setup(interval);
            this.addEventListener(JTTimeEvent.TIMER, listener, caller);
            this.start();
        }

        public once(interval:number, listener:Function, caller:any):void
        {
            this.setup(interval);
            this.addEventListener(JTTimeEvent.TIMER, listener, caller);
            this.start();
        }

        public start():void
        {
            this._running = true;
            JTTimerTool.defaultTimer.addTask(this);
        }

        public stop():void
        {
            this._running = false;
        }

        public get totalCount():number
        {
            return this._totalTimes;
        }

        public get currentCount():number
        {
            return this._currentTimes;
        }

        public set currentCount(value:number)
        {
            this._currentTimes = value;
        }

        public get interval():number
        {
            return this._interval;
        }

        public set interval(value:number)
        {
            this._interval = value;
        }

        public static create(interval:number, loop:number = 0):JTITimer
        {
            let timer:JTITimer = JTPool.instance(JTTimer).get() as JTITimer;
            timer.setup(interval, loop);
            return timer;
        } 

        public static put(timer:JTITimer):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            JTPool.instance(JTTimer).put(timer as JTITimer);
        }
    }

}
