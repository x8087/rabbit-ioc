module com 
{
    export class JTLinkedQueue<V> extends JTCollection<V>
    {
        protected _linkedList:JTDLinkedList<V> = null;
        constructor(linkedList?:JTDLinkedList<V>)
        {
            super()
            this._linkedList = linkedList;
            if (!this._linkedList)
            this._linkedList = new JTDLinkedList();
        }

        public push(...values:V[]):number
        {
            for (let i:number = 0; i < values.length; i++)
            {
                let v:V = values[i];
                this._size = this._linkedList.push(v)
            }
            return this._size;
        }

        public shift():V
        {
            if (this._size > 0) 
            {
                this._size -- ;
                return this._linkedList.shift();
            }
            return null;
        }

        public get(index:number):V
        {
            let i:number = 0;
            let node:JTSNode<V> = this._linkedList.head;
            while(node)
            {
                if (i == index) return node.value;
                i ++;
                node = node.next
            }
            return null;
        }

        public splice(index:number, deleteCount:number = 1):V[]
        {
            return this._linkedList.splice(index, deleteCount);
        }

        public indexOf(value:V):number
        {
            return this._linkedList.indexOf(value);
        }

        public concat(...values):JTLinkedStack<V>
        {
            let count:number = values.length;
            let stack:JTLinkedStack<V> = new JTLinkedStack();
            let list:V[] = this.toValues();
            for (let i:number = 0; i < count; i++)
            {
                let value:any = values[i];
                if (value instanceof Array)
                {
                    list = list.concat(value);
                }
                else if (value instanceof JTLinkedStack)
                {
                    list = list.concat(value.toValues());
                }
                else 
                {
                    list.push(value);
                }
            }
            let totalCount:number = list.length;
            for (let i:number = 0; i < totalCount; i++)
            {
                stack.push(list[i]);
            }
            return stack;
        }

        public merge(...values):void
        {
            let count:number = values.length;
            for (let i:number = 0; i < count; i++)
            {
                let value:any = values[i];
                if (value instanceof Array)
                {
                    let totalCount:number = value.length;
                    for (let i:number = 0; i < totalCount; i++) this._linkedList.push(value[i]);
                }
                else if (value instanceof JTLinkedStack)
                {
                    value = value.toValues();
                    let totalCount:number = value.length;
                    for (let i:number = 0; i < totalCount; i++) this._linkedList.push(value[i]);
                }
                else 
                {
                    this._linkedList.push(value);
                }
            }
        }

        public contains(value:V):boolean 
        {
            return this._linkedList.indexOf(value) > 0;
        }

        public clear():void 
        {
            this._linkedList.clear();
        }

        public getIterator():JTIIterator<V> 
        {
            return null;
        }

        public toValues():V[] 
        {
            return this._linkedList.toValues();
        }
    }
}