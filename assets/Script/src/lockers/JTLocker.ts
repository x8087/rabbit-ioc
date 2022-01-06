namespace com 
{
    export class JTLocker 
    {
        private _lock:Promise<any> = null;
        private resolve:Function = null;
        private reject:Function = null;

        public lock():Promise<any>
        {
            let locker:JTLocker = this;
            this._lock = new Promise((resolve, reject) => 
            {
                    locker.reject = reject;
                    locker.resolve = resolve;
            })
            return this._lock;
        }

        public release():void
        {
            this.resolve(this);
            this._lock = null;
            this.reject = this.resolve = null;
        }

        public kill():void
        {
            this.resolve(this);
            this._lock = null;
            this.reject = this.resolve = null;
        }

        public locked():boolean
        {
            return this._lock != null;
        }

        public tryLock():Promise<any>
        {
            return this.locked() ? this._lock : this.lock();
        }
    }
}
