module com 
{
    /**
     * 任务基类
     */
    export class JTAsyncProcessor extends JTCoroutine
    {
        protected _name:string = null;
        protected _currentIndex:number = 0;
        constructor(name:string)
        {
            super();
            this._name = name;
        }

        public async execute(runnable:JTIAsyncTask)
        {
            runnable.relevance(this);
            runnable.run();
            await this.tryLock(runnable.name)
        }

        public get name():string
        {
            return "TaskProcessor____" + this._name;
        }
    }
}