module com 
{
    export class JTNode<T>
    {
        public value:T = null;

        constructor(data:T)
        {
            this.value = data;
        }

        public toString():string
        {
            return JSON.stringify(this.value);
        }
    }
}