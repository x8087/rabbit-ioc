///<reference path="JTPool.ts"/>
/*
* 支持自动将对象全部回收到对象池里;
*/
namespace com
{
    class JTCachePool<T extends JTIPoolObject> extends JTPool<T>
    {
        protected _references:T[] = null;
        constructor(cls:any)
        {
            super(cls);
            this._references = [];
        }
    
        public get():T
        {
            if (this._size > 0)
            {
                return this._list.shift();
            }
            this._totalCount ++;
            var item:T = new this._cls();
            this._references.push(item);
            return item;
        }
    }
}
