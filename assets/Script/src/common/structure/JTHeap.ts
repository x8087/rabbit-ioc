module com 
{
    export class JTHeap<V> extends JTCollection<V>
    {
        public contains(value:V):boolean 
        {
            return false;
        }

        public clear():void 
        {
            
        }

        public getIterator():JTIIterator<V> 
        {
            return null;
        }

        public toValues():V[] 
        {
            return null;
        }

        constructor()
        {
            super()
        }
    }
}