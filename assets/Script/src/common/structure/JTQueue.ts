module com 
{
    export class JTQueue<V> extends JTCollection<V>
    {
        protected _list:V[] = null;
        constructor()
        {
            super()
            this._list = [];
        }

        public push(...values:V[]):number
        {
            for (let i:number = 0; i < values.length; i++)
            {
                let v:V = values[i];
                this._size = this._list.push(v)
            }
            return this._size;
        }

        public pop():V
        {
            if (this._size > 0) 
            {
                this._size -- ;
                return this.pop();
            }
            return null;
        }

        public indexOf(value:V):number
        {
            return this._list.indexOf(value);
        }

        public concat():JTQueue<V>
        {
            this._list.concat()
            return null;
        }

        public merge():void
        {

        }

        public contains(value:V):boolean 
        {
            return this._list.indexOf(value) > 0;
        }

        public clear():void 
        {
            this._list.length = 0;
        }

        public getIterator():JTIIterator<V> 
        {
            return null;
        }

        public toValues():V[] 
        {
            return [].concat(this._list);
        }
    }
}