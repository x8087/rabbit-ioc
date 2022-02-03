///<reference path="JTSNode.ts"/>
module com 
{
    export class JTDNode<V> extends JTSNode<V>
    {
        public prev:JTDNode<V> = null;

        constructor(data:V)
        {
            super(data);
        }

        public insertPrev(node:JTDNode<V>):void
        {
            node.next = this;
            node.prev = this.prev;
            if (this.prev) this.prev.next = node;
            this.prev = node;
        }

        public insertNext(node:JTDNode<V>):void
        {
            node.next = this.next;
			node.prev = this;
			if (this.next) (this.next as JTDNode<V>).prev = node;
			this.next = node;
        }

        public unlink():void
        {
            if (this.prev) this.prev.next = this.next;
			if (this.next) (this.next as JTDNode<V>).prev = this.prev;
			this.next = this.prev = null;
        }
    }
}