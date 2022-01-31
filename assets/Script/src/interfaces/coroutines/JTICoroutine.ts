

/*
* name;
*/
module com 
{
    export interface JTICoroutine extends JTILocker
    {
        unlock(key?:any):void

        lockedCount:number;

    }
}