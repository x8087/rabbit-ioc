namespace com 
{
    export class JTTimerTool
    {
        public static defaultTimer:JTTimerTool = null;
        public static animationTimer:JTTimerTool = null;
        public static logicTimer:JTTimerTool = null;
        private _pause:boolean = false;
        private _tasks:JTITimeTask[] = null;
        private _currentTime:number = 0;

        constructor()
        {
            this._tasks = [];
        }


        public static initialize():void
        {
            this.defaultTimer = new JTTimerTool();
            this.animationTimer = new JTTimerTool();
            this.logicTimer = new JTTimerTool();
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
            this.syncTasksTick(tick);
            this.updateTasks();
            this._currentTime = nowTime;
        }

        protected syncTasksTick(tick:number):void
        {
            let total:number = this._tasks.length;
            for (let i:number = 0; i < total; i++)
            {
                let task:JTITimeTask = this._tasks[i];
                task.running && task.updateTick(tick);
            }
        }

        protected updateTasks():void
        {
            for (let i:number = 0; i < this._tasks.length; i++)
            {
                let task:JTITimeTask = this._tasks[i];
                if (!task.running)
                {
                    this._tasks.splice(i, 1);
                    i --
                }
            }
        }

        public addTimerTask(task:JTITimeTask):void
        {
            let index:number = this._tasks.indexOf(task);
            if (index != -1) return;
            this._tasks.push(task);
        }

        public removeTask(task:JTITimeTask):void
        {
            let index:number = this._tasks.indexOf(task);
            if (index != -1) return;
            this._tasks.splice(index, 1);
        }

        public put(task:JTITimeTask):void
        {
            let index:number = this._tasks.indexOf(task);
            if (index != -1) return;
            this._tasks.splice(index, 1);
            JTPool.instance(task["constructor"]).put(task as any);
        }
    }
}
