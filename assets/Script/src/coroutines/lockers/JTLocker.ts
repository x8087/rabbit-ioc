///<reference path="../../pools/JTPool.ts"/>
module com 
{
    export class JTLocker implements JTILocker, JTITaskLocker
    {
        protected __fail:Function = null;
        protected __succeed:Function = null;
        protected __lockedLogic:Promise<any> = null;

        public lock():Promise<any>
        {
            if (this.__lockedLogic) return this.__lockedLogic; //注意，当前正使用锁时，如果没有调用release 时不能再使用lock()方法
            let locker:JTLocker = this;
            this.__lockedLogic = new Promise((resolve, reject) => 
            {
                locker.__fail = reject;
                locker.__succeed = resolve;
            })
            return this.__lockedLogic;
        }

        public release():void
        {
            this.clear();
        }

        public unlock():void
        {
            this.__succeed && this.__succeed.apply(this, []);
            this.__succeed = null;
        }

        protected clear():void
        {
            this.__lockedLogic = this.__fail = this.__succeed = null;
        }

        public kill():void
        {
            this.__fail && this.__fail.apply(this, []);
            this.__fail = null;
        }

        public get locked():boolean
        {
            return this.__lockedLogic != null;
        }

        public tryLock():Promise<any>
        {
            this.__lockedLogic &&  this.release();
            return this.lock();
        }

        public get signal():Promise<any>
        {
            return this.__lockedLogic;
        }

        public recycle() 
        {
           this.clear();
        }

        private static _pool:JTIPool = JTPool.instance(JTLocker);
        public static create():JTILocker
        {
            let locker:JTILocker = this._pool.get() as JTLocker;
            return locker;
        }

        public static put(locker:JTLocker):void
        {
            this._pool.put(locker);
        }
    }
}
