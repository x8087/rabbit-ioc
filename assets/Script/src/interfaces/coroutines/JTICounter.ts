

/*
* name;
*/
module com 
{
    export interface JTICounter extends JTILocker
    {
        setTotalCount(totalCount:number):void

        totalCount:number

        succeedCount:number

        failCount:number
     
        completed:boolean

        reset():void;
   
        lockedCount:number;
     
    }
}