namespace com 
{
    export class JTTimerTool
    {
        public static defaultTimer:JTTimerTool = null;
        public static animationTimer:JTTimerTool = null;
        public static logicTimer:JTTimerTool = null;
        private _pause:boolean = false;
        private _tasks:JTITimerTask[] = null;
        private _currentTime:number = 0;
        private static _frameRate:number = 0;
        private static _frameRateTime:number = 0;

        public static FAST_RATE:string = "fast_rate";
        public static NORMAL_RATE:string = "normal_rate";
        public static SLOWY_RATE:string = "slowy_rate";

        public static FAST_FRAME_RATE:number = 120;
        public static NORMAL_FRAME_RATE:number = 60;
        public static SLOWY_FRAME_RATE:number = 30;

        constructor()
        {
            this._tasks = [];
        }


        public static launch(rate:string = "normal_rate"):void
        {
            this.logicTimer = new JTTimerTool();
            this.defaultTimer = new JTTimerTool();
            this.animationTimer = new JTTimerTool();
            switch(rate)
            {
                case this.FAST_RATE:
                {
                    this._frameRate = this.FAST_FRAME_RATE;
                    break;
                }
                case this.NORMAL_RATE:
                {
                    this._frameRate = this.NORMAL_FRAME_RATE;
                    break;
                }
                case this.SLOWY_RATE:
                {
                    this._frameRate = this.SLOWY_FRAME_RATE;
                    break;
                }
            }
        }

        public static get frameRate():number
        {
             return this._frameRate;
        }

        public static get frameRateTime():number
        {
            if (this._frameRateTime == 0)
            {
                this._frameRateTime = 1000 / this._frameRate;
            }
            return this._frameRateTime;
        }

        public stop():void
        {
            this._pause = true;
            this._currentTime = 0;
        }

        public static actives():void
        {
            this.defaultTimer.active();
            this.animationTimer.active();
            this.logicTimer.active();
        }

        /**
         * 如果要使用优化计时器，需要外部计时器回调函数调用此方法
         */
        public active():void
        {
            if (this._currentTime == 0)
            {
                this._currentTime = JTTimeUtils.runnbleTime;
                return;
            }
            if (this._pause) return;
            let nowTime:number = JTTimeUtils.runnbleTime;
            let tick:number = nowTime - this._currentTime;
            this.updateTicks(tick);//统一时间，每一计时器任务根据情况做不同的事
            this.updateTasks();
            this._currentTime = nowTime;
        }

        protected updateTicks(tick:number):void
        {
            let total:number = this._tasks.length;
            for (let i:number = 0; i < total; i++)
            {
                let task:JTITimerTask = this._tasks[i];
                task.running && task.updateTick(tick);
            }
        }

        protected updateTasks():void
        {
            for (let i:number = 0; i < this._tasks.length; i++)
            {
                let task:JTITimerTask = this._tasks[i];
                if (!task.running)
                {
                    this._tasks.splice(i, 1);
                    i --
                }
            }
        }

        public addTask(task:JTITimerTask):void
        {
            let index:number = this._tasks.indexOf(task);
            if (index != -1) return;
            this._tasks.push(task);
        }

        public removeTask(task:JTITimerTask):void
        {
            let index:number = this._tasks.indexOf(task);
            if (index != -1) return;
            this._tasks.splice(index, 1);
        }

        public put(task:JTITimerTask):void
        {
            let index:number = this._tasks.indexOf(task);
            if (index != -1) return;
            this._tasks.splice(index, 1);
            JTPool.instance(task["constructor"]).put(task as any);
        }
    }
}
