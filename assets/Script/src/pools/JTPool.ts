module com 
{
    export class JTPool<T extends JTIPoolObject> implements JTIPool
    {
        private static _poolMap:Object = {};
        protected _cls:any = null;
        protected _list:T[] = null;
        protected _totalCount:number = 0;
        protected _size:number = 0;
        constructor(cls:any)
        {
            this._cls = cls;
            this._list = [];
            this._totalCount = 0;
        }

        public get():T
        {
            if (this._size > 0)
            {
                this._size --;
                return this._list.shift();
            }
            this._totalCount ++;
            return new this._cls();
        }

        public put(item:T):void
        {
            if (item && this._list.indexOf(item) == -1)   
            {
                item.recycle();
                this._size = this._list.push(item);
            }
        }

        public get totalCount():number
        {
            return this._totalCount;
        }

        public get size():number
        {
            return this._size;
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