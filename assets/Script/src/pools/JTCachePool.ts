///<reference path="JTPool.ts"/>
/*
* 支持自动将对象全部回收到对象池里;
*/
module com
{
    export class JTCachePool<T extends JTIPoolObject> extends JTPool<T>
    {
        protected static _cachePoolMap:Object = {};
        protected _references:JTStack<T> = null;
        constructor(cls:any)
        {
            super(cls);
            this._references = new JTStack();
        }
    
        public get():T
        {
            if (this.__stackPool.size > 0)
            {
                return this.__stackPool.pop();
            }
            this._totalCount ++;
            var item:T = new this._cls();
            this._references.push(item);
            return item;
        }

        public recycles(items?:T[]):void
        {
            this._references.concat(items ? items : [])//浅复制
            if (items)
                items = this._references.toValues();
            while(items.length)
            {
                this.put(items.shift())//每一个对象必须调用recycle()方法
            }
        }

        public static instance(cls:any):JTICachePool 
        {
            var pool:JTICachePool = this._cachePoolMap[cls];
            if (!pool)
            {
                pool = this._cachePoolMap[cls] = new JTCachePool(cls);
            }
            return pool;
        }
    }
}
