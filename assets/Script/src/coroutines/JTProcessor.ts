module com 
{
    /**
     * 任务基类
     */
    export class JTProcessor extends JTCoroutine
    {
        protected _name:string = null;
        protected _currentIndex:number = 0;
        constructor(name:string)
        {
            super();
            this._name = name;
        }

        public async execute(runnable:JTIRunnableTask)
        {
            runnable.relevance(this._currentIndex, this);
            runnable.run();
            await this.tryLock(runnable.id)
        }

        public get name():string
        {
            return "Processor" + this._name;
        }
    }
}