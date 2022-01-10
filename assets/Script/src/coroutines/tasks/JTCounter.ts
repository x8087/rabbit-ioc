namespace com 
{
    export class JTCounter extends JTLocker
    {
        private _failCount:number = 0;
        private _succeedCount:number = 0;
        private _totalCount:number = 0;
        private _lockCount:number = 0;
        constructor(totalCount:number)
        {
            super();
            this._totalCount = totalCount;
        }

        public lock():Promise<any>
        {
            if (this._locker) return this._locker; //注意，当前正使用锁时，如果没有调用release 时不能再使用lock()方法
            this._lockCount ++;
            return this._locker;
        }

        public release():void
        {
            super.release();
            this._succeedCount ++;
        }

        public kill():void
        {
            super.kill();
            this._failCount ++;
        }

        public get totalCount():number
        {
            return this._totalCount;
        }

        public get succeedCount():number
        {
            return this._succeedCount;
        }

        public get failCount():number
        {
            return this._failCount;
        }

        public get completed():boolean
        {
            let count:number = this._succeedCount + this._failCount;
            if (this._totalCount != count)return false;
            else
            {
                if (this._totalCount == this._succeedCount) return true;
                else
                {
                    info("the task execute fail count:  " +  this._failCount);
                }
            }
        }

        public get lockCount():number
        {
            return this._lockCount;
        }

        public static create():JTCounter
        {
            return JTPool.instance(JTCounter).get() as JTCounter;
        }
    }
}