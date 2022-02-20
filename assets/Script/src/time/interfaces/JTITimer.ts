module com 
{
    export interface JTITimer extends JTIPoolObject, JTIEventDispatcher
    {
        currentCount:number;

        totalCount:number;

        interval:number;

        running:boolean;

        start():void;

        stop():void;

        reset():void;

        setup(interval:number, loop:number):void

        loop(interval:number, listener:Function, caller:any, args?:any):void

        once(interval:number, listener:Function, caller:any, args?:any):void
    }
}
