namespace com 
{
    export interface JTITimerTask  
    {
        currentCount:number;

        totalCount:number;

        interval:number;

        running:boolean;

        updateTick(tick:number):void;

    }
}
