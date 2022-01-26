

/*
* name;
*/
namespace com 
{
    export interface JTIEventSignaler extends JTIPoolObject
    {
        addEventListener(key:any, method:Function, caller:any, once?:boolean):void

        dispatchEvent(key:any, args?:any)

        removeEventListener(key:any, method:Function, caller:any):void

        removeEvents() 

        registerFunction(key:any, method:Function, caller:any, once?:boolean):void

        execute(key:any, args?:any):void

        removeFunction(key:any, method:Function, caller:any):void

        removeFunctions() 
    }
}