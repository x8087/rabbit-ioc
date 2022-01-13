namespace com 
{
    export class JTCounter extends JTLocker
    {
        /*
        *失败次数
        */
        private _failCount:number = 0;
        /*
        *成功次数
        */
        private _succeedCount:number = 0;

        /*
        *已经完成的次数
        */
        private _lockedCount:number = 0;

        private _totalCount:number = 0;
        constructor()
        {
            super();
        }

        public setTotalCount(totalCount:number):void
        {
            this._totalCount = totalCount;
        }

        public release():void
        {
            super.release();
            this._succeedCount ++;
            this._lockedCount ++;
        }

        public kill():void
        {
            super.kill();
            this._failCount ++;
            this._lockedCount ++;
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
            return true;
        }

        public recycle() 
        {
            super.recycle();
            this._failCount = this._lockedCount = this._succeedCount = this._totalCount = 0;
        }


        public reset():void
        {
            this.recycle();
        }

        public get lockedCount():number
        {
            return this._lockedCount;
        }

        public static create():JTCounter
        {
            return JTPool.instance(JTCounter).get() as JTCounter;
        }

        public get progress():number
        {
            return parseFloat((this._lockedCount / this._totalCount).toFixed(4));
        }
    }
}