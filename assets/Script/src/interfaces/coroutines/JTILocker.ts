

/*
* name;
*/
module com 
{
    export interface JTILocker extends JTIPoolObject
    {
         lock(key?:any):Promise<any>

         release():void

         unlock(key?:any):void;

         kill(key?:any):void
      
         locked:boolean
     
         tryLock(key:any):Promise<any>

       
    }
}