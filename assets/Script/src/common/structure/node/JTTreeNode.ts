module com 
{
    export class JTTreeNode<V> extends JTNode<V>
    {
        public left:JTTreeNode<V> = null;
        public right:JTTreeNode<V> = null;;
        public parent:JTTreeNode<V> = null;;
        constructor(value:V)
        {
            super(value);
            this.value = value;
        }
        
        public setLeft(value:V):void
        {
            if (!this.left)
            {
                this.left = new JTTreeNode(value);
                this. left.parent = this;
            }
            else
            this.left.value = value;
        }
        
        public setRight(value:V):void
        {
            if (!this.right)
            {
                this.right = new JTTreeNode(value);
                this.right.parent = this;
            }
            else
            this.right.value = value;
        }
        
        public isLeft():boolean
        {
            return this == this.parent.left;
        }
        
        public isRight():boolean
        {
            return this == this.parent.right;
        }

        public getDepth(node:JTTreeNode<V> = null):number
        {
            var left:number = -1, right:number = -1;
            if (node == null) node = this;
            if (node.left)
                left = this.getDepth(node.left);
            
            if (node.right)
                right = this.getDepth(node.right);
            
            return ((left > right ? left : right) + 1);
        }
        
        public count():number
        {
            var c:number = 1;
            if (this.left)
                c += this.left.count();
            if (this.right)
                c += this.right.count();
            return c;
        }
        
        /**
         * Recursively clears the tree by deleting all child nodes underneath
         * the node the method is called on.
         */
        public destroy():void
        {
            if (this.left)
            this.left.destroy();
            
            this.left = null;
            
            if (this.right)
            this.right.destroy();
            this.right = null;
        }
        
        /**
         * Prints out a string representing the current object.
         * 
         * @return A string representing the current object.
         */
        public toString():string
        {
            return "[BinaryTreeNode, data= " + this.value + "]";
        }

        
        public static preorder<V>(node:JTTreeNode<V>, process:Function):void
        {
            if (!node) return;
            process(node);
            if (node.left)JTTreeNode.preorder(node.left, process);
            if (node.right) JTTreeNode.preorder(node.right, process);
        }
        
        public static inorder<V>(node:JTTreeNode<V>, process:Function):void
        {
            if (!node)
            if (node.left)  JTTreeNode.inorder(node.left, process);
            process(node);
            if (node.right) JTTreeNode.inorder(node.right, process);
        }
        
        public static postorder<V>(node:JTTreeNode<V>, process:Function):void
        {
            if (!node)
            if (node.left) JTTreeNode.postorder(node.left, process);
            if (node.right)JTTreeNode.postorder(node.right, process);
            process(node);
        }
    }
}