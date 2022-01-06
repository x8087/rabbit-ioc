namespace com 
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

    }
}
