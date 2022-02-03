///<reference path="JTLinkedCollection.ts"/>
module com 
{
    export class JTLinkedList<V> extends JTLinkedCollection<JTListNode<V>, V>
    {
        constructor()
        {
            super();
        }

        public join(sep:string): string 
        {
            if (this._length == 0) return "";
            var __c:string = "";
            var node:JTListNode<V> = this._head;
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
            if (this._length == 0) return [];
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
            if (this._length == 0) return index;
            let node:JTListNode<V> = this._head;
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
            if (this._length == 0) return false;
            let node:JTListNode<V> = this._head;
            while(node)
            {
                 if (node.value == value)  return true;
                 node = node.next;
            }
            return false;
        }

        public split(node:JTListNode<V>, count:number):V[]
        {
            let values:V[] = [];
            if (this._length == 0) return values;
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
            if (this._length == 0) return values;
            let node:JTListNode<V> = this._head;
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
                let start:JTListNode<V> = null;
                while(node)
                {
                    if (i >= index - 1)
                    {
                        start = node;
                        if (!start.next)
                        {
                            new Error()
                        }
                        let end:JTListNode<V>= this.splices(start.next, count, values);
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

        protected splices(node:JTListNode<V>, count:number, values:V[]):JTListNode<V>
        {
            let currentCount:number = 0;
            while(node)
            {
                currentCount ++;
                this._length --;
                values.push(node.value);
                let v:JTListNode<V> = node;
                node = node.next;
                v.unlink();
                if (currentCount == count) return node;
            }
            return null;
        }

        public clear(): void 
        {
            if (this._length == 0) return;
            let node:JTListNode<V> = this._head;
            while(node)
            {
                node.unlink();
                node = node.next;
            }
            this._head = this._tail = null;
        }

        public getIterator():JTIterator 
        {
            throw new Error("Method not implemented.");
        }

        public push(...args:V[]):number 
        {
            let count:number = args.length;
            let node:JTListNode<V> = new JTListNode(args[0]);
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
                    node = new JTListNode(args[i]);
                    this._tail.next = node;
                }
            }
            this._tail = node;
            this._length += count;
            return this._length;
        }

        public shift():V 
        {
            if (!this._head) 
            {
                this._tail = null;
                return null;
            }
            let value:V = this._head.value;
            let node:JTListNode<V> = this._head.next;
            this._head.unlink();
            this._head = node;
            this._length --;
            if (!this._head || !this._head.next) this._tail = this._head; 
            return value
        }

        public unshift(...args:V[]):number 
        {
            let count:number = args.length;
            let node:JTListNode<V> = new JTListNode(args[0]);
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
                    node = new JTListNode(args[i]);
                    node.next = this._head;
                }
            }
            this._head = node;
            this._length += count;
            return this._length;
        }

        public concat(...args):JTICollection<V>
        {
            let linkedList:JTLinkedList<V> = new JTLinkedList<V>();
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
            linkedList["_length"] += count;
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
            if (this._length == 0) return;
            let node:JTListNode<V> = this._head;
            while(node)
            {
                content += node.toString();
                node = node.next;
            }
            return content;
        }
        
    }
}