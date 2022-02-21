module com 
{
    /**
     * 任务基类
     */
    export abstract class JTTask implements JTIRunnable
    {
        protected _id:number | string = 0;

        /**
         * 需要重写此方法
         */
        public abstract run():any;

        public recycle() 
        {
            this._id = null;
        }

        public get id():number | string
        {
            return this._id;
        }
    }
}