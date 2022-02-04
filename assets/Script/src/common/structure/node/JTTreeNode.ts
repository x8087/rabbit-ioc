module com 
{
    export class JTTreeNode<V> extends JTNode<V>
    {
        public childLeft:JTTreeNode<V> = null;

        public childRight:JTTreeNode<V> = null;

        public parent:JTTreeNode<V> = null;

        constructor(value:V, parent:JTTreeNode<V>, left:JTTreeNode<V>, right:JTTreeNode<V>)
        {
            super(value);
            this.parent = parent;
            this.childLeft = left;
            this.childRight = right;
        }

        public leftInsert(child:JTTreeNode<V>):void
        {
                    
        }

        public rightInsert(child:JTTreeNode<V>):void
        {

        }
    }
}