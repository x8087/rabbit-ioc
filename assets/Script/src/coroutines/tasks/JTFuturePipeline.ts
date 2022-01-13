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
        protected ___dataList:any[] = null;

        constructor(__datas?:any[])
        {
            super();
            this.___dataList = __datas;
        }

        public set dataList(___datas:any[])
        {
            this.___dataList = ___datas;
            this._counter.setTotalCount(___datas.length);
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
            this.removes();
            this._counter.reset();
            this._tasks = null;
            this._factroy = null;
            this._itemRender && JTCommand.put(this._itemRender);
            this._itemProvider && JTCommand.put(this._itemProvider);
            this._itemProvider = null;
            this._itemRender = null;
            this.___dataList = null;
        }
        
        private createTasks():JTITaskExecutor[] 
        {
            let list:JTITaskExecutor[] = [];
            let totalCount:number = this._counter.totalCount;
            if (this._itemRender)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTITaskExecutor = this._itemRender.run();
                    list.push(task);
                }
            }
            else if (this._itemProvider)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTITaskExecutor = this._itemProvider.runWith([i, this.___dataList[i]]);
                    list.push(task);
                }
            }
            else if (this._factroy)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTITaskExecutor = this._factroy.produce();
                    list.push(task);
                }
            }
            return list;
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