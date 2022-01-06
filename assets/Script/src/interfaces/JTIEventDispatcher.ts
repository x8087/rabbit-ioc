namespace com 
{
    export interface JTIEventDispatcher  
    {
         addEventListener(key:any, method:Function, caller:any, once?:boolean):void
        
         dispatchEvent(key:any, args?:any):void
        
         removeEventListener(key:any, method:Function, caller:any):void

         removeEvents(key:any):void
        
    }
}
