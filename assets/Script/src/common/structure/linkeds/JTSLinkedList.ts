///<reference path="JTLinkedList.ts"/>
module com 
{
    export class JTSLinkedList<V> extends JTLinkedList<JTSNode<V>, V>
    {
        constructor()
        {
            super();
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
            if (this._head)
			{
				var value:V = this._head.value;
				if (this._head == this._tail)  this._head = this._tail = null;
				else
				{
					var node:JTSNode<V> = this._head;
					this._head = this._head.next;
					node.unlink();
					if (!this._head) this._tail = null;
				}
				this._size--;
				return value;
			}
			return null;
        }

        public pop():V
		{
			if (this._tail)
			{
				var value:V = this._tail.value;
				if (this._head == this._tail)    this._head = this._tail = null;
				else
				{
					var node:JTSNode<V> = this._head;
					while (node.next != this._tail)	node = node.next;
                    this._tail = node;
					node.next = null;
				}
				this._size--;
				return value;
			}
			return null;
		}

        public unshift(...args:V[]):number 
        {
            let count:number = args.length;
            let node:JTSNode<V> = new JTSNode(args[count - 1]);
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
                for (let i:number = count - 2; i >= 0; i--)
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
            if (count == 0) return;
			var linkedList:JTSLinkedList<V> =  args[0];
			if (linkedList.head)
			{
				if (this._head)
				{
					this._tail.next = linkedList.head;
					this._tail = linkedList.tail;
				}
				else
				{
					this._head = linkedList.head;
					this._tail = linkedList.tail;
				}
				this._size += linkedList.size;
			}
			for (var i:number = 1; i < count; i++)
			{
				linkedList = args[i];
				if (linkedList.head)
				{
					this._tail.next = linkedList.head;
					this._tail = linkedList.tail;
					this._size += linkedList.size;
				}
			}
        }

        public reverse():void
		{
            if (this._size == 0) return;
			var values:JTSNode<V>[] = [];
            let i:number = 0;
			var node:JTSNode<V> = this._head;
			while (node)
			{
				values[i++] = node;
				node = node.next;
			}
			values.reverse();
			node = this._head = values[0];
			for (i = 1; i < this._size ; i++)
            {
				node = node.next = values[i];
            }
			node.next = null;
			this._tail = node;
			values = null;
		}
    }
}