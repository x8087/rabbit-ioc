///<reference path="base/JTCollection.ts"/>
module com 
{
    export class JTStack<V> extends JTCollection<V>
    {
        protected _list:V[] = null;
        constructor()
        {
            super()
            this._list = [];
        }

        public push(...values:V[]):number
        {
            for (let i:number = 0; i < values.length; i++)
            {
                let v:V = values[i];
                this._size = this._list.push(v)
            }
            return this._size;
        }

        public pop():V
        {
            if (this._size > 0) 
            {
                this._size -- ;
                return this._list.pop();
            }
            return null;
        }

        public get(index:number):V
        {
            return this._list[index];
        }

        public splice(index:number, deleteCount:number = 1):V[]
        {
            return this._list.splice(index, deleteCount);
        }

        public indexOf(value:V):number
        {
            return this._list.indexOf(value);
        }

        public concat(...values):JTStack<V>
        {
            let count:number = values.length;
            let queue:JTStack<V> = new JTStack();
            let list:V[] = this.toValues();
            for (let i:number = 0; i < count; i++)
            {
                let value:any = values[i];
                if (value instanceof Array)
                {
                    list = list.concat(value);
                }
                else if (value instanceof JTStack)
                {
                    list = list.concat(value.toValues());
                }
                else 
                {
                    list.push(value);
                }
            }
            queue._list = list;
            return queue;
        }

        public merge(...values):void
        {
            let count:number = values.length;
            for (let i:number = 0; i < count; i++)
            {
                let value:any = values[i];
                if (value instanceof Array)
                {
                    this._list = this._list.concat(value);
                }
                else if (value instanceof JTStack)
                {
                    this._list = this._list.concat(value.toValues());
                }
                else 
                {
                    this._list.push(value);
                }
            }
        }

        public contains(value:V):boolean 
        {
            return this._list.indexOf(value) > 0;
        }

        public clear():void 
        {
            this._list.length = 0;
        }

        public getIterator():JTIIterator<V> 
        {
            return null;
        }

        public toValues():V[] 
        {
            return [].concat(this._list);
        }
    }
}