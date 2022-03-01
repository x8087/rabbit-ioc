///<reference path="JTTaskExecutor.ts"/>
module com 
{
    /**
     * 异步事件任务对列
     */
    export class JTTaskQueueExecutor<T extends JTIRunnableTask> extends JTTaskExecutor<T>
    {
        /***
         * 启动异步对列
         * */
        public async run():Promise<any>
        {   
            super.run();
            let index:number = 0;
            let node:JTSNode<T> = this._linkedTasks.head;
            while(node)
            {
                let task:T = node.value;
                task.relevance(++index, this._taskCounter);
                task.run();
                await this._taskCounter.lock();
                this.dispatch(JTTaskEvent.TASK_PROGRESS, this);
                if (task.isCompleted())
                {
                    this._linkedTasks.split(node, 1);
                }
                node = node.next;
            }
            if (this._taskCounter.completed)
            {
                this.dispatch(JTTaskEvent.TASK_COMPLETE, this);
                this._locker && this.release();
            }
        }  
    }
}