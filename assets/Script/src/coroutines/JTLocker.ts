namespace com 
{
    export class JTLocker implements JTIPoolObject
    {

        protected _resolve:Function = null;
        protected _reject:Function = null;
        protected _locker:Promise<any> = null;

        public lock():Promise<any>
        {
            if (this._locker) return this._locker; //注意，当前正使用锁时，如果没有调用release 时不能再使用lock()方法
            let locker:JTLocker = this;
            this._locker = new Promise((resolve, reject) => 
            {
                    locker._reject = reject;
                    locker._resolve = resolve;
            })
            return this._locker;
        }

        public release():void
        {
            this._resolve && this._resolve(this);
            this._locker = this._reject = this._resolve = null;
        }

        public kill():void
        {
            this._reject && this._reject(this);
            this._locker = this._reject = this._resolve = null;
        }

        public locked():boolean
        {
            return this._locker != null;
        }

        public tryLock():Promise<any>
        {
            return this.locked() ? this._locker : this.lock();
        }

        public recycle() 
        {
            this.release();
        }

        public static create():JTLocker
        {
            return JTPool.instance(JTLocker).get() as JTLocker;
        }
    }
}
