///<reference path="base/JTLinkedList.ts"/>
module com 
{
    export class JTDLinkedList<V> extends JTLinkedList<JTDNode<V>, V>
    {
        constructor()
        {
            super();
        }

        public splice(index:number, count:number):V[]
        {
            let values:V[] = [];
            if (this._size == 0) return values;
            let node:JTDNode<V> = this._head;
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
                let start:JTDNode<V> = null;
                while(node)
                {
                    if (i >= index - 1)
                    {
                        start = node;
                        if (!start.next)
                        {
                            new Error()
                        }
                        let end:JTDNode<V>= this.splices(start.next as JTDNode<V>, count, values);
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
                    node = node.next as JTDNode<V>;
                    i++
                }
            }
            return values;
        }

        protected splices(node:JTDNode<V>, count:number, values:V[]):JTDNode<V>
        {
            let currentCount:number = 0;
            while(node)
            {
                currentCount ++;
                this._size --;
                values.push(node.value);
                let v:JTDNode<V> = node;
                node = node.next as JTDNode<V>;
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
            var count:number = args.length;
			var node:JTDNode<V> = new JTDNode(args[0]);
			if (this._head)
			{
				this._tail.insertNext(node);
			}
			else
            {
                this._tail = this._head = node;
            }
			if (count > 1)
			{
				for (var i:number = 1; i < count; i++)
				{
					node = new JTDNode<V>(args[i]);
					this._tail.insertNext(node);
				}
			}
            this._tail = this._tail.next as JTDNode<V>;
			this._size += count;
			return this._size ;
        }

        public shift():V 
        {
			if (this._head)
			{
				var value:V = this._head.value;
				this._head = this._head.next as JTDNode<V>;
				if (this._head)  this._head.prev = null;
				else
                {
                    this._tail = null;
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
				this._tail = this._tail.prev;
				if (this._tail) this._tail.next = null;
				else
                {
                    this._head = null;
                }
				this._size--;
				return value;
			}
			return null;
        }

        public unshift(...args:V[]):number 
        {
            var count:number = args.length;
			var node:JTDNode<V> = new JTDNode(args[count - 1]);
			if (this._tail)
			{
				this._head.insertPrev(node);
			}
			else
            {
                this._tail = this._head = node;
            }
			if (count > 1)
			{
				for (var i:number = count - 2; i >= 0; i--)
				{
					node = new JTDNode<V>(args[i]);
                    this._head.insertPrev(node);
				}
			}
            this._head = this._head.prev;
			this._size += count;
			return this._size ;
        }

        public concat(...args):JTILinkedList<V>
        {
            let count:number = args.length;
            if (count == 0) return;
            var __linkedList:JTDLinkedList<V> = new JTDLinkedList();
			let node:JTDNode<V> = this._head;
			while (node)
			{
                __linkedList.push(node.value);
				node = node.next as JTDNode<V>;
			}
            var list:JTDLinkedList<V> = null;
			for (var i:number = 0; i < count; i++)
			{
				list = args[i];
				node = list.head;
				while (node)
				{
					__linkedList.push(node.value);
					node = node.next as JTDNode<V>;
				}
			}
			return __linkedList;
        }

        public marge(...args): void 
        {
            let count:number = args.length;
            if (count == 0) return;
            var __linkedList:JTDLinkedList<V> = args[0];
			if (__linkedList.head)
			{
				if (this._head)
				{
					this._tail.next = __linkedList.head;
					__linkedList.head.prev = this._tail;
					this._tail = __linkedList.tail;
				}
				else
				{
					this._head = __linkedList.head;
					this._tail = __linkedList.tail;
				}
				this._size += __linkedList.size;
			}
			
			for (var i:number = 1; i < count; i++)
			{
				__linkedList = args[i];
				if (__linkedList.head)
				{
					this._tail.next = __linkedList.head;
					__linkedList.head.prev = this._tail;
					this._tail = __linkedList.tail;
					this._size += __linkedList.size;
				}
			}
        }
        
        public reverse():void
		{
			if (this._size == 0) return;
			
			var mark:JTDNode<V>;
			var node:JTDNode<V> = this._tail;
			while (node)
			{
				mark = node.prev;
				
				if (!node.next)
				{
					node.next = node.prev;
					node.prev = null;
					this._head = node;
				}
				else
                {
                    if (!node.prev)
                    {
                        node.prev = node.next as JTDNode<V>;
                        node.next = null;
                        this._tail = node;
                    }
                    else
                    {
                        var next:JTDNode<V> = node.next as JTDNode<V>;
                        node.next = node.prev;
                        node.prev = next;
                    }
                }
				node = mark;
			}
		}
        
    }
}