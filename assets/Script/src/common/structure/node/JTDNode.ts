///<reference path="JTSNode.ts"/>
module com 
{
    export class JTDNode<T> extends JTSNode<T>
    {
        public prev:JTDNode<T> = null;

        constructor(data:T)
        {
            super(data);
        }

        
        public insertAfter(node:JTDNode<T>):void
        {

        }

        public unlink():void
        {
            // this.value = this.next = this.owner = null;
        }
    }
}