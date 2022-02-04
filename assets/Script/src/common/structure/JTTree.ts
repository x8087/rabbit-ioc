module com 
{
    export class JTTree<V> extends JTCollection<V> implements JTILinkedList<V>
    {
        protected _root:JTTreeNode<V> = null;
        protected _size:number = 0;
        constructor()
        {
            super();
         
        }

        public indexOf(value:V):number 
        {
            return -1;
        }

        public shift():V 
        {
            return null;            
        }
        
        public unshift(...args: V[]):number 
        {
            return -1;
        }
        
        public concat(...args: any[]):JTICollection<V>
        {
            return null;
        }

        public marge(...args: any[]):void 
        {
           
        }

        public join(sep: string):string 
        {
            return null;
        }

        public push(...args:V[]):number
        {
            let count:number = args.length;
            if (count == 0) return;
            if (!this._root)
            {
                this._root = new JTTreeNode(args.shift(), null, null, null);
                this._size = 1;
            }
            let parent:JTTreeNode<V> = this._root;
            while(args.length)
            {
                let node:JTTreeNode<V> = new JTTreeNode(args.shift(), parent, null, null);
                let rightFlag:boolean = this._size % 2 == 0;
                if (rightFlag)
                {
                    this.searchRight(parent)
                }
            }
        }

        
        protected searchRight(node:JTTreeNode<V>):JTTreeNode<V>
        {
            if (node.childRight)
            {
                this.searchRight(node.childRight);
            }
            return node.childRight
        }

        protected searchLeft(node:JTTreeNode<V>):JTTreeNode<V>
        {
            if (node.childLeft)
            {
                this.searchLeft(node.childLeft);
            }
            return node.childLeft;
        }

        public append(value:V):number
        {
            return this._size;
        }

        protected insert(node:JTTreeNode<V>, value:V):void
        {
            let flag:boolean = this._size % 2 ? true : false;
        }

        public contains(value:V):boolean 
        {
            return false;
        }
        public clear():void 
        {
           
        }

        public getIterator():JTIIterator<V> 
        {
            return null;
        }

        public toValues():V[] 
        {
            return [];
        }
    }
}