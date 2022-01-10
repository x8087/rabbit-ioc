namespace com 
{
    export abstract class JTTaskExecutor extends JTTask implements JTITaskExecutor
    {
        protected _locker:JTLocker = null;

        public relevance(locker: JTLocker): void 
        {
            this._locker = locker;
        }

        recycle() 
        {
            this._locker = null;
        }
    }
}