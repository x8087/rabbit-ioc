///<reference path="JTNode.ts"/>
module com 
{
    export class JTListNode<T> extends JTNode<T>
    {
        public next:JTListNode<T> = null;

        constructor(data:T)
        {
            super(data);
        }

        public insertAfter(node:JTListNode<T>):void
        {

        }

        public unlink():void
        {
            this.value = this.next = null;
            // this.value = this.next = this.owner = null;
        }
    }
}