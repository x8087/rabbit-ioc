

/*
* name;
*/
module com 
{
    export interface JTICounter extends JTILocker
    {

        succeedCount:number

        failCount:number
     
        reset():void;
   
        lockedCount:number;
     
    }
}