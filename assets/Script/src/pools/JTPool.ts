///<reference path="../structure/JTStack.ts"/>
module com 
{
    export class JTPool<T extends JTIPoolObject> implements JTIPool
    {
        private static _poolMap:Object = {};
        protected _cls:any = null;
        protected __stackPool:JTStack<T> = null;
        protected _totalCount:number = 0;
        constructor(cls:any)
        {
            this._cls = cls;
            this.__stackPool = new JTStack();
            this._totalCount = 0;
        }

        public get():T
        {
            if (this.__stackPool.size > 0)
            {
                return this.__stackPool.pop();
            }
            this._totalCount ++;
            return new this._cls();
        }

        public put(item:T):void
        {
            if (item && this.__stackPool.indexOf(item) == -1)   
            {
                item.recycle();
                this.__stackPool.push(item);
            }
        }

        public get totalCount():number
        {
            return this._totalCount;
        }

        public get size():number
        {
            return this.__stackPool.size;
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