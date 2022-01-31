///<reference path="../tasks/JTTask.ts"/>
module com 
{
    export abstract class JTAsyncTask extends JTTask implements JTIAsyncTask
    {
        private _counter:JTCounter = null;

        public relevance(counter: JTCounter): void 
        {
            this._counter = counter;
        }

        protected release():void
        {
            if (this._counter)
            {
                this._counter.unlock();
                this._counter.release();
            }
        }

        protected kill():void
        {
            if (this._counter)
            {
                this._counter.kill();
                this._counter.release();
            }
        }

        recycle() 
        {
            this._counter = null;
        }
    }
}