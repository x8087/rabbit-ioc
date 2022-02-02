module com 
{
    export interface JTICollection<V>
    {
        contains(value:V):boolean 

        indexOf(value:V):number

        clear():void; 

        getIterator():JTIterator; 

        push(...args:V[]):number

        shift():V;

        unshift(...args:V[]):number;

        concat(...args):JTICollection<V>

        marge(...args):void

        toValues():any[]
		
		isEmpty():boolean

		join(sep:string):string

        length:number;
    }
}