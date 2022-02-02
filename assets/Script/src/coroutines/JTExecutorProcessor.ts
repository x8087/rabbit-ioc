module com 
{
    /**
     * 任务基类
     */
    export class JTExecutorProcessor 
    {
        protected __taskQueue:JTIAsyncTask[] = null;

        protected __freeQueue:JTProcessor[] = null;

        protected __enterFrame:JTIEnterFrame = null;

        constructor(cores:number = 4)
        {
            this.__taskQueue = [];
            this.__freeQueue = [];
            for (let i:number = 0; i < cores; i++)
            {
                this.__freeQueue.push(new JTProcessor(i.toString()));
            }
            this.__enterFrame = JTEnterFrame.create();
            this.__enterFrame.addEventListener(JTTimeEvent.ENTER_FRAME, this.executeTask, this);
            this.launch();
        }

        protected async executeTask(e:JTIEnterFrame)
        {
            if (this.__freeQueue.length > 0 && this.__taskQueue.length > 0)
            {
                let task:JTIAsyncTask = this.__taskQueue.shift();
                let processor:JTProcessor = this.__freeQueue.shift();
                await processor.execute(task);
                this.__freeQueue.push(processor);
            }
        }

        public execute(task:JTIAsyncTask):void
        {
            task.id = (JTTimeUtils.runnbleTime + "|" + Math.random() * 1000000)
            this.__taskQueue.push(task);
        }

        protected launch():void
        {
            this.__enterFrame.play();
        }
    }
}