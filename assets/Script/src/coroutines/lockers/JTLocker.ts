///<reference path="../../pools/JTPool.ts"/>
module com 
{
    export class JTLocker implements JTILocker, JTITaskLocker
    {
        protected __fail:Function = null;
        protected __succeed:Function = null;
        protected __signal:Promise<any> = null;

        public lock():Promise<any>
        {
            if (this.__signal) return this.__signal; //注意，当前正使用锁时，如果没有调用release 时不能再使用lock()方法
            let locker:JTLocker = this;
            this.__signal = new Promise((resolve, reject) => 
            {
                locker.__fail = reject;
                locker.__succeed = resolve;
            })
            return this.__signal;
        }

        public release():void
        {
            this.clear();
        }

        public unlock(data?:any):void
        {
            let succeed:Function = this.__succeed;
            this.__succeed = null;
            succeed && succeed.apply(this, [data]);
            succeed = null;
        }
 

        protected clear():void
        {
            this.__signal = this.__fail = this.__succeed = null;
        }

        public kill(data?:any):void
        {
            let fail:Function = this.__fail;
            this.__fail = null;
            fail && fail.apply(this, [data]);
            fail = null;
        }

        public get locked():boolean
        {
            return this.__signal != null;
        }

        public tryLock():Promise<any>
        {
            this.__signal &&  this.release();
            return this.lock();
        }

        public get signal():Promise<any>
        {
            return this.__signal;
        }

        public recycle() 
        {
           this.clear();
        }

        private static _pool:JTIPool = JTPool.instance(JTLocker);
        
        public static create():JTILocker
        {
            let locker:JTILocker = this._pool.get() as JTILocker;
            return locker;
        }

        public static put(locker:JTILocker):void
        {
            this._pool.put(locker);
        }
    }
}
