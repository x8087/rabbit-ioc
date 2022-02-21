module com 
{
    export interface JTIEventDispatcher  
    {
         addEventListener(key:any, method:Function, caller:any, once?:boolean):void
        
         dispatch(key:any, args?:any)
        
         removeEventListener(key:any, method:Function, caller:any):void

         removeEvents(key:any):void
         
         removes():void;
    }
}
