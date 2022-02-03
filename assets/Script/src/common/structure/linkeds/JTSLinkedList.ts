///<reference path="JTLinkedList.ts"/>
module com 
{
    export class JTSLinkedList<V> extends JTLinkedList<JTSNode<V>, V>
    {
        constructor()
        {
            super();
        }

        public join(sep:string): string 
        {
            if (this._size == 0) return "";
            var __c:string = "";
            var node:JTSNode<V> = this._head;
            while (node)
            {
                __c += node.value + sep;
                node = node.next;
            }
            __c += node.value;
            return __c;
        }

        public toValues(): V[] 
        {
            if (this._size == 0) return [];
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
            if (this._size == 0) return index;
            let node:JTSNode<V> = this._head;
            while(node)
            {
                index++;
                if (node.value == value)return index;
                node = node.next;
            }
            return -1;
        }

        public contains(value:V):boolean 
        {
            if (this._size == 0) return false;
            let node:JTSNode<V> = this._head;
            while(node)
            {
                 if (node.value == value)  return true;
                 node = node.next;
            }
            return false;
        }

        public split(node:JTSNode<V>, count:number):V[]
        {
            let values:V[] = [];
            if (this._size == 0) return values;
            if (this._head == node)
            {
                return this.splice(0, count);
            }
            let index:number = this.indexOf(node.value)
            return this.splice(index, count);
        }

        public splice(index:number, count:number):V[]
        {
            let values:V[] = [];
            if (this._size == 0) return values;
            let node:JTSNode<V> = this._head;
            if (index == 0)
            {
                this._head = this.splices(node, count, values);
                if (!this._head)
                {
                    this._head = this._tail = null;
                }
            }
            else
            {
                let i:number = 0;
                let start:JTSNode<V> = null;
                while(node)
                {
                    if (i >= index - 1)
                    {
                        start = node;
                        if (!start.next)
                        {
                            new Error()
                        }
                        let end:JTSNode<V>= this.splices(start.next, count, values);
                        if (!end)
                        {
                            start.next = null;
                            this._tail = start;
                        }
                        else
                        {
                            start.next = end;
                        }
                        return values;
                    }
                    node = node.next;
                    i++
                }
            }
            return values;
        }

        protected splices(node:JTSNode<V>, count:number, values:V[]):JTSNode<V>
        {
            let currentCount:number = 0;
            while(node)
            {
                currentCount ++;
                this._size --;
                values.push(node.value);
                let v:JTSNode<V> = node;
                node = node.next;
                v.unlink();
                if (currentCount == count) return node;
            }
            return null;
        }

        public clear(): void 
        {
            if (this._size == 0) return;
            let node:JTSNode<V> = this._head;
            while(node)
            {
                node.unlink();
                node = node.next;
            }
            this._head = this._tail = null;
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
            if (!this._head) 
            {
                this._tail = null;
                return null;
            }
            let value:V = this._head.value;
            let node:JTSNode<V> = this._head.next;
            this._head.unlink();
            this._head = node;
            this._size --;
            if (!this._head || !this._head.next) this._tail = this._head; 
            return value
        }

        public unshift(...args:V[]):number 
        {
            let count:number = args.length;
            let node:JTSNode<V> = new JTSNode(args[0]);
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

        public concat(...args):JTILinkedList<V>
        {
            let linkedList:JTSLinkedList<V> = new JTSLinkedList<V>();
            if (this._head && this._tail)
            {
                linkedList.push(this._head.value);
                linkedList.unshift(this._tail.value);
            }
            let count:number = args.length;
            let values:V[] = Array.isArray(args[0]) ? args[0] : [args[0]];
            if (count > 1)
            {
                for (let i:number = 1; i < count; i++)
                {
                     values = values.concat(args[i])
                }
            }
            count = values.length;
            for (let i:number = 0; i < count; i++)
            {
                linkedList.push(values[i]);
            }
            linkedList["_size"] += count;
            return linkedList;
        }

        public marge(...args): void 
        {
            let count:number = args.length;
            for (let i:number = 0; i < count; i++)
            {
                this.push(args[i])
            }
        }

        public toString():string
        {
            let content:string = "";
            if (this._size == 0) return;
            let node:JTSNode<V> = this._head;
            while(node)
            {
                content += node.toString();
                node = node.next;
            }
            return content;
        }
        
    }
}