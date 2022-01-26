module com 
{
    export class JTClassMapper
    {
        protected __class:any = null;
        /**
         * 是否由对象池创建 ---false为new,
         */
        protected _createFromPool:boolean = false;

        /**
         * 这个设计和通信的解码decoder、编码encoder有些重复
         * 数据类型 -- 对象
         *            序列化对象
         *            字符串
         *            二进制流
         */
        protected _dataFormat:string = null;


        protected _pool:JTIPool = null;
        constructor(_class:any, createFromPool:boolean = false)
        {
               this.__class = _class;
               this._createFromPool = createFromPool;
        }

        public get createFromPool():boolean
        {
            return this._createFromPool;
        }

        public get pool():JTIPool
        {
            if (!this._pool)
            {
                this._pool = JTCachePool.instance(this.__class);
            }
            return this._pool;
        }

        public create():JTIMapper
        {
            let item:JTIMapper = null;
            if (this._createFromPool)item = this.pool.get() as JTIMapper;
            else
            {
                item = new this.__class();
            }
            return item;
        }
    }
}
