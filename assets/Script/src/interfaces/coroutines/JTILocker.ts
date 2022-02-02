

/*
* name;
*/
module com 
{
    export interface JTILocker extends JTIPoolObject
    {

         lock(data?:any):Promise<any>

         release():void

         unlock(args?:any):void;

         kill(args?:any):void
      
         locked:boolean
     
         tryLock(key:any):Promise<any>

       
    }
}