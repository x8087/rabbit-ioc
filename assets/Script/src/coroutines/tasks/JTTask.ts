module com 
{
    /**
     * 任务基类
     */
    export abstract class JTTask implements JTIRunnable
    {
        protected ___id:number | string = 0;

        /**
         * 需要重写此方法
         */
        public abstract run():any;

        public recycle() 
        {
        }

        public get id():number | string
        {
            return this.___id;
        }

        public set id(value:number | string)
        {
            this.___id = value;
        }
    }
}