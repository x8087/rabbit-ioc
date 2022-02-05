///<reference path="base/JTLinkedList.ts"/>
module com 
{
    export class JTSLinkedList<V> extends JTLinkedList<JTSNode<V>, V>
    {
        constructor()
        {
            super();
        }

        public get(index:number):JTSNode<V>
        {
            let i:number = 0;
            let node:JTSNode<V> = this.head;
            while(node)
            {
                if (i == index) return node;
                i ++;
                node = node.next;
            }
            return null;
        }

        public splice(index:number, count:number):V[]
        {
            let values:V[] = [];
            if (this._size == 0) return values;
            let start:JTSNode<V> = null;
            let startHead:JTSNode<V> = null;
            if (index == 0)
            {
                start = this._head;
            }
            else
            {
                startHead = this.get(index - 1);
                start = startHead.next;
            }
            for (let i:number = 0; i < count; i++)
            {
                if (!start) break;
                values.push(start.value);
                this._size --;
                start = start.next as JTSNode<V>;
            }
            if (!start)
            {
                if (!startHead) this._tail = this._head = null;
                else
                {
                    this._tail= startHead;
                    this._tail.unlink();
                }
            }
            else
            {
                if (!startHead) 
                {
                    this._head = start;
                }
                else
                {
                    startHead.next = start;
                }
            }
            return values;
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
                this._tail = this._tail.next;
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
                    this._tail = this._tail.next;
                }
            }
        
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


        /***
         * 性能十分差。
         * 建议用shift();因为单向链表没有上一个节点，只有下向节点，不可能逆向循环，如果上强行调用此方法，只有从头开始遍历
         */
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
				this._head = node;
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
                    this._head = node;
                }
            }
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