module com 
{
    export abstract class JTLinkedCollection<T extends JTNode<V>, V> implements JTICollection<V>
    {
        protected _tail:T = null;
        protected _head:T = null;
        protected _length:number = 0;

        constructor()
        {

        }
  
        public abstract indexOf(value:V):number;

        public abstract join(sep:string):string 

        public abstract contains(value:V):boolean 

        public abstract clear():void; 

        public abstract getIterator():JTIterator; 

        public abstract push(...args:V[]):number

        public abstract shift():V;

        public abstract unshift(...args:V[]):number;

        public abstract concat(...args):JTICollection<V>

        public abstract marge(...args:V[]):void

        public abstract toValues():V[]
      
		
		public isEmpty():boolean
        {
            return this._length == 0
        }
 
        public get length():number
        {
            return this._length
        }

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