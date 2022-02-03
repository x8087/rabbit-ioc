///<reference path="JTNode.ts"/>
module com 
{
    export class JTTableNode<T> extends JTListNode<T>
    {
        public prev:JTTableNode<T> = null;

        constructor(collection:JTICollection<T>, data:T)
        {
            super(collection, data);
        }

        
        public insertAfter(node:JTTableNode<T>):void
        {

        }

        public unlink():void
        {
            // this.value = this.next = this.owner = null;
        }
    }
}