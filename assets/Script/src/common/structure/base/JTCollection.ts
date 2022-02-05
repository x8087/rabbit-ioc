module com 
{
    export abstract class JTCollection<V> implements JTICollection<V>
    {
        protected _size:number = 0;

        constructor()
        {
            
        }

        public abstract contains(value:V):boolean
  
        public abstract clear():void;
         
        public abstract getIterator():JTIIterator<V>;
         
        public get size():number
        {
            return this._size;
        }

        public set size(value:number)
        {
            this._size = value;
        }
         
        public isEmpty():boolean
        {
            return this._size == 0;
        }
         
        public abstract toValues():V[];
    }
}