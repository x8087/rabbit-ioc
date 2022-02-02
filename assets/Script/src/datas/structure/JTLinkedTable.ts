///<reference path="JTLinkedCollection.ts"/>
module com 
{
    export class JTLinkedTable<V> extends JTLinkedCollection<JTListNode<V>, V>
    {
        constructor()
        {
            super();
        }

        public join(sep:string):string 
        {
            if (this._length == 0) return "";
            var __c:string = "";
            var node:JTListNode<V> = this._head;
            while (node.next)
            {
                __c += node.value + sep;
                node = node.next;
            }
            __c += node.value;
            return __c;
        }

        public toValues(): V[] 
        {
            let values:V[] = [];
            var node:JTListNode<V> = this._head;
            while (node)
            {
                values.push(node.value);
                node = node.next;
            }
            return values;
        }

        public indexOf(value:V):number
        {
           let index:number = -1;
           let node:JTListNode<V> = this._head;
           while(node.next)
           {
                if (node.value == value)return index;
                index++;
           }
            return index;
        }

        public contains(value:V):boolean 
        {
            let node:JTListNode<V> = this._head;
            while(node.next)
            {
                 if (node.value == value)return true;
            }
            return false;
        }

        public clear(): void 
        {
            let node:JTListNode<V> = this._head;
            while(node.next)
            {
                node.unlink();
            }
        }

        public getIterator():JTIterator 
        {
            throw new Error("Method not implemented.");
        }

        public push(...args:V[]):number 
        {
            let count:number = args.length;
            let node:JTListNode<V> = new JTListNode(this, args[0]);
            if (this._head)
            {
                this._tail.next = node;
            }
            else
            {
                this._tail = this._head = node;
            }
            if (count > 1)
            {
                for (let i = 1; i < count; i++)
                {
                    node = new JTListNode(this, args[i]);
                    this._tail.next = node;
                }
            }
            this._tail = node;
            this._length += count;
            return this._length;
        }

        public shift():V 
        {
            let value:V = this._head.value;
            let node:JTListNode<V> = this._head.next;
            this._head.unlink();
            this._head = node;
            this._length --;
            return value
        }

        public unshift(...args: V[]):number 
        {
            let count:number = args.length;
            let node:JTListNode<V> = new JTListNode(this, args[0]);
            if (this._tail)
            {
                node.next = this._head;
            }
            else
            {
                this._tail = this._head = node;
            }
            if (count > 1)
            {
                for (let i = 1; i < count; i++)
                {
                    node = new JTListNode(this, args[i]);
                    node.next = this._head;
                }
            }
            this._head = node;
            this._length += count;
            return this._length;
        }

        public pop():V 
        {
            let value:V = this._tail.value;
            let node:JTListNode<V> = this._tail.next;
            this._head.unlink();
            this._head = node;
            this._length --;
            return value;
        }

        public concat(...args:V[]):JTLinkedList<V>
        {
            let linkedList:JTLinkedTable<V> = new JTLinkedTable<V>();
            linkedList.push(this._head.value);
            linkedList.unshift(this._tail.value);
            let count:number = args.length;
            for (let i:number = 0; i < count; i++)
            {
                linkedList.push(args[i])
            }
            linkedList["_length"] = this.length + count;
            return linkedList;
        }

        public marge(...args:V[]): void 
        {
            let count:number = args.length;
            for (let i:number = 0; i < count; i++)
            {
                this.push(args[i])
            }
            this._length += count;
        }
        
    }
}