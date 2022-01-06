namespace com 
{
    export interface JTITimerTask  
    {
        currentCount:number;

        totalCount:number;

        interval:number;

        updateTick(tick:number):void;

    }
}
