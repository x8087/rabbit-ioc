module com 
{
    export abstract class JTTaskExecutor extends JTTask implements JTITaskExecutor
    {
        private _counter:JTCounter = null;

        public relevance(counter: JTCounter): void 
        {
            this._counter = counter;
        }

        protected release():void
        {
            this._counter && this._counter.release();
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