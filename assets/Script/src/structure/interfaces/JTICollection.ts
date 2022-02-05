module com 
{
    export interface JTICollection<V>
    {
	
        contains(value:V):boolean
  
        clear():void
         
        getIterator():JTIIterator<V>
         
        size:number;
         
        isEmpty():boolean
         
        toValues():V[]
    }
}