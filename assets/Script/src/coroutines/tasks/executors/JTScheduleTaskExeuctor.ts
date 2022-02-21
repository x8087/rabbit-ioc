///<reference path="JTTaskExecutor.ts"/>
module com 
{
    /**
     * 异步事件任务对列
     */
    export class JTScheduleTaskExeuctor extends JTTaskExecutor
    {
        /***
         * 启动异步对列
         * */
        public async run():Promise<any>
        {   
            super.run();
            let index:number = 0;
            while(this._linkedTasks.size)
            {
                let task:JTIRunnableTask = this._linkedTasks.shift();
                task.relevance(index ++, this._taskCounter);
                task.run();
                await this._taskCounter.lock();
                this.dispatch(JTTaskEvent.TASK_PROGRESS, this);
                task.recycle();
            }
            if (this._taskCounter.completed)
            {
                this.dispatch(JTTaskEvent.TASK_COMPLETE, this);
                this.release();
            }
        }  
    }
}