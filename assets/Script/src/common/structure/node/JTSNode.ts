///<reference path="JTNode.ts"/>
module com 
{
    export class JTSNode<T> extends JTNode<T>
    {
        public next:JTSNode<T> = null;

        constructor(data:T)
        {
            super(data);
        }

        public insertNext(node:JTDNode<T>):void
        {
            this.next = node;
        }

        public unlink():void
        {
            this.next = null;
        }


    }
}