///<reference path="../common/structure/linkeds/JTSLinkedList.ts"/>
module com 
{
    export class JTPool<T extends JTIPoolObject> implements JTIPool
    {
        private static _poolMap:Object = {};
        protected _cls:any = null;
        protected __linkedPool:JTSLinkedList<T> = null;
        protected _totalCount:number = 0;
        constructor(cls:any)
        {
            this._cls = cls;
            this.__linkedPool = new JTSLinkedList();
            this._totalCount = 0;
        }

        public get():T
        {
            if (this.__linkedPool.size > 0)
            {
                return this.__linkedPool.shift();
            }
            this._totalCount ++;
            return new this._cls();
        }

        public put(item:T):void
        {
            if (item && this.__linkedPool.indexOf(item) == -1)   
            {
                item.recycle();
                this.__linkedPool.push(item);
            }
        }

        public get totalCount():number
        {
            return this._totalCount;
        }

        public get size():number
        {
            return this.__linkedPool.size;
        }

        public static instance(cls:any):JTIPool 
        {
            var pool:JTIPool = this._poolMap[cls];
            if (!pool)
            {
                pool = this._poolMap[cls] = new JTPool(cls);
            }
            return pool;
        }
    }
}