

/*
* name;
*/
module com 
{
    export interface JTILocker extends JTIPoolObject
    {
         lock(__caller?:any):Promise<any>

         release():void
       
         kill():void
      
         locked():boolean
     
         tryLock(__caller:any):Promise<any>
       
    }
}