namespace com 
{
    export class JTLocker implements JTLocker 
    {
        protected _resolve:Function = null;
        protected _reject:Function = null;
        protected _locker:Promise<any> = null;
        protected ___result:any = null;
        /**
         * 如果不传结果，则会返回JTLocker自身
         * @param __result 
         * @returns 
         */
        public lock(__result?:any):Promise<any>
        {
            if (this._locker) return this._locker; //注意，当前正使用锁时，如果没有调用release 时不能再使用lock()方法
            let locker:JTLocker = this;
            this.___result = __result ? __result : this;
            this._locker = new Promise((resolve, reject) => 
            {
                    locker._reject = reject;
                    locker._resolve = resolve;
            })
            return this._locker;
        }

        public release():void
        {
            this._resolve && this._resolve.apply(this, [this.___result])
            this.recycle();
        }

        public kill():void
        {
            this._reject && this._reject.apply(this, [this.___result])
            this.recycle();
        }

        public locked():boolean
        {
            return this._locker != null;
        }

        /**
         * 如果不传结果，则会返回JTLocker自身
         * @param __result 
         * @returns 
         */
        public tryLock(__caller:any):Promise<any>
        {
            this.___result = __caller ? __caller : this;
            return this.locked() ? this._locker : this.lock(this.___result);
        }

        public recycle() 
        {
            this.___result = this._locker = this._reject = this._resolve = null;
        }

        public static create():JTLocker
        {
            return JTPool.instance(JTLocker).get() as JTLocker;
        }
    }
}
