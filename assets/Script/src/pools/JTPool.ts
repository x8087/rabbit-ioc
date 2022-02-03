///<reference path="../common/structure/JTLinkedList.ts"/>
module com 
{
    export class JTPool<T extends JTIPoolObject> implements JTIPool
    {
        private static _poolMap:Object = {};
        protected _cls:any = null;
        protected __linkedPool:JTLinkedList<T> = null;
        protected _totalCount:number = 0;
        constructor(cls:any)
        {
            this._cls = cls;
            this.__linkedPool = new JTLinkedList();
            this._totalCount = 0;
        }

        public get():T
        {
            if (this.__linkedPool.length > 0)
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
            return this.__linkedPool.length;
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