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

        public insertAfter(node:JTSNode<T>):void
        {

        }

        public unlink():void
        {
            this.value = this.next = null;
            // this.value = this.next = this.owner = null;
        }
    }
}