module com 
{
    export interface JTIIterator<V>
    {
        next():JTNode<V>
		
		hasNext():boolean
		
		start():void
		
		data:V;
    }
}