///<reference path="../tasks/JTTask.ts"/>
module com 
{
    export abstract class JTAsyncTask extends JTTask implements JTIAsyncTask
    {
        protected _counter:JTITaskCounter = null;

        public relevance(counter: JTITaskCounter): void 
        {
            this._counter = counter;
        }

        protected release():void
        {
            this._counter && this._counter.unlock();
        }

        protected kill():void
        {
            this._counter && this._counter.kill();
        }

        recycle() 
        {
            this._counter = null;
        }
    }
}