///<reference path="JTLinkedList.ts"/>
module com 
{
    export class JTDLinkedList<V> extends JTLinkedList<JTSNode<V>, V>
    {
        constructor()
        {
            super();
        }

        public join(sep:string):string 
        {
            if (this._size == 0) return "";
            var __c:string = "";
            var node:JTSNode<V> = this._head;
            while (node.next)
            {
                __c += node.value + sep;
                node = node.next;
            }
            __c += node.value;
            return __c;
        }

        public toValues():V[] 
        {
            let values:V[] = [];
            var node:JTSNode<V> = this._head;
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
           let node:JTSNode<V> = this._head;
           while(node.next)
           {
                if (node.value == value)return index;
                index++;
           }
            return index;
        }

        public contains(value:V):boolean 
        {
            let node:JTSNode<V> = this._head;
            while(node.next)
            {
                 if (node.value == value)return true;
            }
            return false;
        }

        public clear(): void 
        {
            let node:JTSNode<V> = this._head;
            while(node.next)
            {
                node.unlink();
            }
        }

        public getIterator():JTIIterator<V>
        {
            return null;
        }

        public push(...args:V[]):number 
        {
            let count:number = args.length;
            let node:JTSNode<V> = new JTSNode(args[0]);
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
                    node = new JTSNode(args[i]);
                    this._tail.next = node;
                }
            }
            this._tail = node;
            this._size += count;
            return this._size;
        }

        public shift():V 
        {
            let value:V = this._head.value;
            let node:JTSNode<V> = this._head.next;
            this._head.unlink();
            this._head = node;
            this._size --;
            return value
        }

        public unshift(...args: V[]):number 
        {
            let count:number = args.length;
            let node:JTSNode<V> = new JTSNode( args[0]);
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
                    node = new JTSNode(args[i]);
                    node.next = this._head;
                }
            }
            this._head = node;
            this._size += count;
            return this._size;
        }

        public pop():V 
        {
            let value:V = this._tail.value;
            let node:JTSNode<V> = this._tail.next;
            this._head.unlink();
            this._head = node;
            this._size --;
            return value;
        }

        
        public concat(...args:V[]):JTILinkedList<V>
        {
            let linkedList:JTDLinkedList<V> = new JTDLinkedList<V>();
            linkedList.push(this._head.value);
            linkedList.unshift(this._tail.value);
            let count:number = args.length;
            for (let i:number = 0; i < count; i++)
            {
                linkedList.push(args[i])
            }
            linkedList["_size"] = this.size + count;
            return linkedList;
        }

        public marge(...args:V[]): void 
        {
            let count:number = args.length;
            for (let i:number = 0; i < count; i++)
            {
                this.push(args[i])
            }
            this._size += count;
        }
        
    }
}