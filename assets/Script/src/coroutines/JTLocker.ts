namespace com 
{
    export class JTLocker 
    {
        private _resolve:Function = null;
        private _reject:Function = null;
        private _lock:Promise<any> = null;

        public lock():Promise<any>
        {
            let locker:JTLocker = this;
            this._lock = new Promise((resolve, reject) => 
            {
                    locker._reject = reject;
                    locker._resolve = resolve;
            })
            return this._lock;
        }

        public release():void
        {
            this._resolve && this._resolve(this);
            this._lock = null;
            this._reject = this._resolve = null;
        }

        public kill():void
        {
            this._reject && this._reject(this);
            this._lock = null;
            this._reject = this._resolve = null;
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
