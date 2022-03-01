///<reference path="../../../events/JTEventDispatcher.ts"/>
module com 
{
    /**
     * 异步事件任务对列
     */
    export abstract class JTTaskExecutor<T extends JTIRunnableTask> extends JTRunnableTask implements JTIEventDispatcher
    {
        protected _taskCounter:JTTaskCounter = JTTaskCounter.create();

        protected _linkedTasks:JTSLinkedList<T> = null;

        protected _factroy:JTIFactory = null;

        protected _taskProvider:JTHandler = null;

        protected _dispatcher:JTEventDispatcher = null;

        constructor()
        {
            super();
            this._dispatcher = new JTEventDispatcher()
        }

        /***
         * 启动异步对列
         * */
        public async run():Promise<any>
        {   
            if (!this._linkedTasks)
            {
                this._linkedTasks = this.createTasks();
            }
            // while(this._linkedTasks.size)
            // {
            //     let task:JTIAsyncTask = this._linkedTasks.shift();
            //     task.relevance(this._counter);
            //     task.run();
            //     await this._counter.lock();
            //     this.dispatchEvent(JTTaskEvent.TASK_PROGRESS, this);
            //     task.recycle();
            // }
            // if (this._counter.completed)
            // {
            //     this.dispatchEvent(JTTaskEvent.TASK_COMPLETE, this);
            // }
        }   

        /**
         * 重置，清空上次所有任务队列数据
         */
        public reset():void
        {
            this.removes();
            this._taskCounter.reset();
            let provider:JTHandler = this._taskProvider;
            this._factroy = this._linkedTasks  = this._taskProvider = null;
            provider && JTHandler.put(provider);
        }
        
        protected createTasks():JTSLinkedList<T>
        {
            let __linkedList:JTSLinkedList<T> = new JTSLinkedList();
            let totalCount:number = this._taskCounter.totalCount;
            if (this._taskProvider)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:T = this._taskProvider.runWith([i]);
                    __linkedList.push(task);
                }
            }
            else if (this._factroy)
            {
                for (let i:number = 0; i < totalCount; i++)
                {
                    let task:T = this._factroy.produce(i);
                    __linkedList.push(task);
                }
            }
            return __linkedList;
        }

        public addEventListener(key:any, method: Function, caller: any, once?: boolean): void 
        {
            this._dispatcher.addEventListener(key, method, caller, once);
        }

        public dispatch(key: any, args?: any) 
        {
            this._dispatcher.dispatch(key, args)
        }

        public removeEventListener(key: any, method: Function, caller: any): void 
        {
            this._dispatcher.removeEventListener(key, method, caller)
        }

        public removeEvents(key: any): void 
        {
            this._dispatcher.removeEvents(key);
        }

        public removes(): void 
        {
            this._dispatcher.removes();
        }

        /**
         * 设置工厂
         */
        public set factory(value:JTIFactory)
        {
            this._factroy = value;
        }

        public set totalCount(value:number)
        {
            this.taskCounter.setTotalCount(value);
        }

        /**
         * 创建任务类命令
         */
        public set taskProvider(value:JTHandler)
        {
            this._taskProvider = value;
        }
 
        /**
         * 计数器
         */
        public get taskCounter():JTTaskCounter
        {
            return this._taskCounter;
        }

        public get progress():number
        {
            return this._taskCounter.progress;
        }


    }
}