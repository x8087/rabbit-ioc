module com 
{
    /**
     * 任务基类
     */
    export abstract class JTTask implements JTITask
    {
        /**
         * 需要重写此方法
         */
        public abstract execute():Promise<any>;

        public recycle() 
        {
        }
    }
}