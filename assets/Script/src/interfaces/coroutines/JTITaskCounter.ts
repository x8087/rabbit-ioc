

/*
* name;
*/
module com 
{
    export interface JTITaskCounter extends JTICounter
    {
        setTotalCount(totalCount:number):void

        totalCount:number
     
        completed:boolean

        reset():void;
    }
}