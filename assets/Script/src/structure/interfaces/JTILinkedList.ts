module com 
{
    export interface JTILinkedList<V> extends JTICollection<V>
    {

        get(index:number):JTNode<V>

        getItem(index:number):V;

        indexOf(value:V):number

        push(...args:V[]):number

        shift():V;

        unshift(...args:V[]):number;

        concat(...args):JTICollection<V>

        marge(...args):void

		join(sep:string):string

    }
}