///<reference path="../../events/JTEventDispatcher.ts"/>
namespace com 
{
    /**
     * 异步事件任务对列
     */
    export class JTFuturePipeline extends JTEventDispatcher
    {
        protected _counter:JTTaskCounter = JTTaskCounter.create();
        protected _tasks:JTITaskExecutor[] = null;
        protected _factroy:JTIFactory = null;
        protected _itemProvider:JTCommand = null;
        protected _itemRender:JTCommand = null;
        protected ___dataList:any[] = null;

        /**
         * 数据列表
         * @param __datas 
         */
        constructor(__datas?:any[])
        {
            super();
            this.dataList = __datas;
        }

        /**
         * 设置数据列表
         */
        public set dataList(___datas:any[])
        {
            this.___dataList = ___datas;
            this._counter.setTotalCount(___datas.length);
        }

        /***
         * 启动异步对列
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

        /**
         * 重置，清空上次所有任务队列数据
         */
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
                    let task:JTITaskExecutor = this._itemRender.runWith([i, this.___dataList[i]]);
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

        /**
         * 设置工厂
         */
        public set factory(value:JTIFactory)
        {
            this._factroy = value;
        }

        /**
         * 创建任务命令
         */
        public set itemRender(value:JTCommand)
        {
            this._itemRender = value;
        }

        /**
         * 创建任务类命令
         */
        public set itemProvider(value:JTCommand)
        {
            this._itemProvider = value;
        }
 
        /**
         * 计数器
         */
        public get counter():JTTaskCounter
        {
            return this._counter;
        }
    }
}