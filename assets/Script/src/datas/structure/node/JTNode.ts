module com 
{
    export class JTNode<T>
    {
        public value:T = null;
        public owner:JTICollection<T> = null;

        constructor(owner:JTICollection<T>, data:T)
        {
            this.value = data;
            this.owner = owner;
        }

        public unlink():void
        {
            this.value = this.owner = null;
        }
    }
}