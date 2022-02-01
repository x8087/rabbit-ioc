module com 
{
    /**
     * 任务基类
     */
    export abstract class JTTask implements JTITask
    {
        protected _name:number | string = 0;

        /**
         * 需要重写此方法
         */
        public abstract run():Promise<any>;

        public recycle() 
        {
        }

        public get name():number | string
        {
            return this._name;
        }

        public set name(value:number | string)
        {
            this._name = value;
        }
    }
}