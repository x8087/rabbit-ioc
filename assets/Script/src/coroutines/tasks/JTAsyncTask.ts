///<reference path="../tasks/JTTask.ts"/>
module com 
{
    export abstract class JTAsyncTask extends JTTask implements JTIAsyncTask
    {

        protected _counter:JTILocker = null;

        public relevance(counter:JTILocker):void 
        {
            this._counter = counter;
        }

        protected release():void
        {
            this._counter && this._counter.unlock(this.___id);
        }

        protected kill():void
        {
            this._counter && this._counter.kill(this.___id);
        }

        recycle() 
        {
            this._counter = null;
        }
    }
}