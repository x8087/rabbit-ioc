///<reference path="JTPool.ts"/>
/**
 * 
 */
 namespace com 
 {
    export class JTFixedPool<T extends JTIPoolObject> extends JTPool<T>
    {
        private _fixedCount:number = 0;
        constructor(cls:any, fixedCount:number = 5)
        {
            super(cls);
            this.fixedCount = fixedCount;
        }

        public set fixedCount(value:number)
        {
            this._fixedCount = value;
            this.create();
        }

        protected create():void
        {
            var list:T[] = this._list;
            var count:number = 0;
            var lines:T[] = [];
            while(list.length)
            {
                var item:T = list.shift();
                if (this._fixedCount > count)
                {
                    lines.push(item);
                    count ++;
                }
                else item = null;
            }
            if (this._fixedCount > count)
            {
                    var leng:number = this._fixedCount - count;
                    var cls:any = this._cls;
                    list = list.concat(lines)
                    for (var i:number = 0; i < leng; i++)
                    {
                        var item:T = new cls();
                        list.push(item);
                    }
            }
        }

        public get():T
        {
            if (this._size > 0)
            {
                return this._list.shift();
            }
            return null;
        }


        /***
         * 检查池是否满了，如果满了，对象池则不会创建对象。
         * */
        public get fullPool():boolean
        {
            return this._fixedCount == this._size;
        }
    }
 }
