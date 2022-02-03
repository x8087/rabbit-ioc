module com 
{
    export interface JTILinkedList<V> extends JTICollection<V>
    {

        indexOf(value:V):number

        push(...args:V[]):number

        shift():V;

        unshift(...args:V[]):number;

        concat(...args):JTILinkedList<V>

        marge(...args):void

		join(sep:string):string

    }
}