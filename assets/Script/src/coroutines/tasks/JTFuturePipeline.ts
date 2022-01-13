///<reference path="../../events/JTEventDispatcher.ts"/>
namespace com 
{
    export class JTFuturePipeline extends JTEventDispatcher
    {
        protected _counter:JTCounter = JTCounter.create();
        protected _tasks:JTITaskExecutor[] = null;
        protected _factroy:JTIFactory = null;
        protected _itemProvider:JTCommand = null;
        protected _itemRender:JTCommand = null;

        constructor(totalCount?:number)
        {
            super();
            this.setTotalCount(totalCount);
        }

        public setTotalCount(totalCount:number):void
        {
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

        public reset():void
        {
            this._counter.reset();
            this._tasks = null;
            this._factroy = null;
            this._itemRender && JTCommand.put(this._itemRender);
            this._itemProvider && JTCommand.put(this._itemProvider);
            this._itemProvider = null;
            this._itemRender = null;
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

        public set itemRender(value:JTCommand)
        {
            this._itemRender = value;
        }

        public set itemProvider(value:JTCommand)
        {
            this._itemProvider = value;
        }
 
        public get counter():JTCounter
        {
            return this._counter;
        }
    }
}