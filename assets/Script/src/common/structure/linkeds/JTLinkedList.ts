
///<reference path="../JTCollection.ts"/>
module com 
{
    export abstract class JTLinkedList<T extends JTNode<V>, V> extends JTCollection<V> implements JTILinkedList<V>
    {
        protected _tail:T = null;
        protected _head:T = null;

        constructor()
        {
            super();
        }
  
        public abstract indexOf(value:V):number;

        public abstract join(sep:string):string 

        public abstract push(...args:V[]):number

        public abstract shift():V;

        public abstract unshift(...args:V[]):number;

        public abstract concat(...args):JTILinkedList<V>

        public abstract marge(...args:V[]):void

        public get tail():T
        {
            return this._tail;
        }

        public get head():T
        {
            return this._head;
        }
    }
}