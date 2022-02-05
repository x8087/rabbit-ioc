module com 
{
    export interface JTIterator
    {
		next():JTNode<any>

		hasNext():boolean

		start():void

		value:any;
    }
}