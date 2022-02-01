module com 
{
    /**
     * 任务基类
     */
    export class JTFuturePipeline 
    {
        protected __taskQueue:JTIAsyncTask[] = null;

        protected __freeQueue:JTAsyncProcessor[] = null;

        protected __workerQueue:JTAsyncProcessor[] = null;

        protected __enterFrame:JTIEnterFrame = null;

        constructor(cores:number = 4)
        {
            this.__taskQueue = [];
            this.__freeQueue = [];
            this.__workerQueue = [];
            for (let i:number = 0; i < cores; i++)
            {
                this.__freeQueue.push(new JTAsyncProcessor(i.toString()));
            }
            this.__enterFrame = JTEnterFrame.create();
            this.__enterFrame.addEventListener(JTTimeEvent.ENTER_FRAME, this.executeTask, this);
            this.launch();
        }

        protected async executeTask(e:JTIEnterFrame)
        {
            // if (this.__freeQueue.length > 0 && this.__taskQueue.length > 0)
            // {
            //     info(" task Queue size: " + this.__taskQueue.length);
            //     let task:JTIAsyncTask = this.__taskQueue.shift();
            //     let processor:JTAsyncProcessor = this.__freeQueue.shift();
            //     await processor.execute(task);
            //     info(" task Queue size: " + this.__taskQueue.length);
            //     this.__freeQueue.push(processor);
            // }
            // while(this.__freeQueue.length)
            // {
                if (this.__freeQueue.length > 0 && this.__taskQueue.length > 0)
                {
                    let task:JTIAsyncTask = this.__taskQueue.shift();
                    let processor:JTAsyncProcessor = this.__freeQueue.shift();
                    info("processor name:   " + processor.name + "        working!")
                    this.__workerQueue.push(processor);
                    await processor.execute(task);
                }
                for (let i:number = 0; i < this.__workerQueue.length; i++)
                {
                    let processor:JTAsyncProcessor = this.__workerQueue[i];
                    if (!processor.locked)
                    {
                        this.__workerQueue.splice(i, 1);
                        i --
                        this.__freeQueue.push(processor)
                    }
                }
        }

        public execute(task:JTIAsyncTask):void
        {
            task.name = (JTTimeUtils.runnbleTime + "|" + Math.random() * 1000000)
            this.__taskQueue.push(task);
        }

        protected launch():void
        {
            this.__enterFrame.play();
        }
    }
}