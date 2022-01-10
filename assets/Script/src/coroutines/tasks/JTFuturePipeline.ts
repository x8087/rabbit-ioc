namespace com 
{
    export class JTFuturePipeline extends JTEventDispatcher
    {
        protected _counter:JTCounter = JTCounter.create();
        protected _tasks:JTITaskExecutor[] = null;
        protected _factroy:JTIFactory = null;
        protected _itemProvider:JTEvent = null;
        protected _itemRender:JTEvent = null;

        constructor(totalCount:number)
        {
            super();
            this._counter.setTotalCount(totalCount);
        }

        /***
         * 
         * */
        public async run():Promise<any>
        {   
            this._tasks = this.createTasks();
            while(this._tasks.length)
            {
                let task:JTITaskExecutor = this._tasks.shift();
                task.relevance(this._counter);
                task.execute();
                await this._counter.lock();
                this.dispatchEvent(JTTaskEvent.TASK_PROGRESS, this);
                task.recycle();
            }
            if (this._counter.completed)
            {
                this.dispatchEvent(JTTaskEvent.TASK_COMPLETE, this);
            }
        }   
        
        private createTasks(): JTITaskExecutor[] 
        {
            let taskList:JTITaskExecutor[] = [];
            let totalCount:number = this._counter.totalCount;
            if (this._itemRender)
            {
                    for (let i:number = 0; i < totalCount; i++)
                    {
                        let task:JTITaskExecutor = this._itemRender.run();
                        taskList.push(task);
                    }
            }
            else if (this._itemProvider)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTITaskExecutor = this._itemProvider.runWith([i, totalCount]);
                    taskList.push(task);
                }
            }
            else if (this._factroy)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTITaskExecutor = this._factroy.produce();
                    taskList.push(task);
                }
            }
            return taskList;
        }

        public set factory(value:JTIFactory)
        {
            this._factroy = value;
        }

        public set itemRender(value:JTEvent)
        {
            this._itemRender = value;
        }

        public set itemProvider(value:JTEvent)
        {
            this._itemProvider = value;
        }
 
        public get counter():JTCounter
        {
            return this._counter;
        }
    }
}