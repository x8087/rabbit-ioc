
///<reference path="./JTCollection.ts"/>
module com 
{
    export abstract class JTLinkedList<T extends JTSNode<V>, V> extends JTCollection<V> implements JTILinkedList<V>
    {
        protected _tail:T = null;
        protected _head:T = null;

        constructor()
        {
            super();
        }

        /**
         * 查询值在链表的索引
         * @param value 
         * @returns 
         */
        public indexOf(value:V):number
        {
            let index:number = -1;
            if (this._size == 0) return index;
            let node:T = this._head;
            while(node)
            {
                index++;
                if (node.value == value)return index;
                node = node.next as T;
            }
            return -1;
        }

        public get(index:number):T
        {
            let i:number = 0;
            let node:T = this.head;
            while(node)
            {
                if (i == index) return node;
                i ++;
                node = node.next as T;
            }
            return null;
        }


        public getItem(index:number):V
        {
            let node:JTNode<V> = this.get(index);
            return node.value;
        }

        /**
         * 在每一个节点加一个字符串
         * @param sep 
         * @returns 
         */
        public join(sep:string): string 
        {
            if (this._size == 0) return "";
            var __c:string = "";
            var node:T = this._head;
            while (node)
            {
                __c += node.value + sep;
                node = node.next as T;
            }
            __c += node.value;
            return __c;
        }

        /**
         * 将值转换成一个数组
         * @returns 
         */
        public toValues(): V[] 
        {
            if (this._size == 0) return [];
            let values:V[] = [];
            var node:T = this._head;
            while (node)
            {
                values.push(node.value);
                node = node.next as T;
            }
            return values;
        }

        /**
         * 根据节点删除节点数
         * @param node 
         * @param count 
         * @returns 
         */
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

        /**
         * 是否包含该对象
         * @param value 
         * @returns 
         */
        public contains(value:V):boolean 
        {
            if (this._size == 0) return false;
            let node:T = this._head;
            while(node)
            {
                 if (node.value == value)  return true;
                 node = node.next as T;
            }
            return false;
        }

        public clear():void 
        {
            if (this._size == 0) return;
            let node:JTSNode<V> = this._head;
            var next:JTSNode<V> = null;
            while(node)
            {
                next = node.next;
                node.unlink();
                node = next;
            }
            this._size = 0;
            this._head = this._tail = null;
        }

        public abstract concat(...args):JTILinkedList<V>

        public abstract marge(...args): void 

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

        public abstract splice(index:number, count:number):V[];

        public abstract push(...args:V[]):number
        
        public abstract unshift(...args:V[]):number;
        
        public abstract shift():V;

        public abstract pop():V;

        public abstract reverse():void;
 

        public get tail():T
        {
            return this._tail;
        }

        public get head():T
        {
            return this._head;
        }
    }
}