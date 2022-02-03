///<reference path="../../events/JTEventDispatcher.ts"/>
module com 
{
    /**
     * 异步事件任务对列
     */
    export class JTAsyncTaskPipeline extends JTEventDispatcher
    {
        protected _counter:JTTaskCounter = JTTaskCounter.create();

        protected _linkedTasks:JTILinkedList<JTIAsyncTask> = null;

        protected _factroy:JTIFactory = null;

        protected _itemProvider:JTEvent = null;

        protected _itemRender:JTEvent = null;

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
            this._linkedTasks = this.createTasks();
            while(this._linkedTasks.size)
            {
                let task:JTIAsyncTask = this._linkedTasks.shift();
                task.relevance(this._counter);
                task.run();
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
            let provider:JTEvent = this._itemRender;
            let render:JTEvent = this._itemRender
            this.___dataList = this._factroy = this._linkedTasks = this._itemRender = this._itemProvider = null;
            render && JTEvent.put(render);
            provider && JTEvent.put(provider);
        }
        
        private createTasks():JTILinkedList<JTIAsyncTask>
        {
            let __linkedList:JTSLinkedList<JTIAsyncTask> = new JTSLinkedList();
            let totalCount:number = this._counter.totalCount;
            if (this._itemRender)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTIAsyncTask = this._itemRender.runWith([i, this.___dataList[i]]);
                    __linkedList.push(task);
                }
            }
            else if (this._itemProvider)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTIAsyncTask = this._itemProvider.runWith([i, this.___dataList[i]]);
                    __linkedList.push(task);
                }
            }
            else if (this._factroy)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:JTIAsyncTask = this._factroy.produce();
                    __linkedList.push(task);
                }
            }
            return __linkedList;
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
        public set itemRender(value:JTEvent)
        {
            this._itemRender = value;
        }

        /**
         * 创建任务类命令
         */
        public set itemProvider(value:JTEvent)
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