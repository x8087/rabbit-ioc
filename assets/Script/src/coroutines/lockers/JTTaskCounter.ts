module com 
{
    /**
     * 任务计数器
     */
    export abstract class JTTaskCounter extends JTCounter
    {
        /**
         * 总共需要执行多少次
         */
        private _totalCount:number = 0;
        constructor()
        {
            super();
        }

        /**
         * 设置总共需要执行多少次
         * @param totalCount 总次数
         */
        public setTotalCount(totalCount:number):void
        {
            this._totalCount = totalCount;
        }

        /**
         * 总次数
         */
        public get totalCount():number
        {
            return this._totalCount;
        }

        public recycle() 
        {
            super.recycle();
            this._totalCount = 0;
        }

        /**
         * 是否完成
         * 只要失败和成功总次数不等于totalCount时，返回false
         * 否则返回true
         */
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

        /**
         * 执行进度的百分比,返回小数点后四位
         */
        public get progress():number
        {
            return parseFloat((this._lockedCount / this._totalCount).toFixed(4));
        }

        public static create():JTTaskCounter
        {
            return JTPool.instance(JTTaskCounter).get() as JTTaskCounter;
        }
    }
}