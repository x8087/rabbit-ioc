namespace com 
{
    export interface JTITimer extends JTIPoolObject
    {
        currentCount:number;

        totalCount:number;

        interval:number;

        start():void;

        stop():void;

        reset():void;

        setup(interval:number, loop:number):void

    }
}
