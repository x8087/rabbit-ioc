namespace com 
{
    export interface JTITimerTask  
    {
        updateTick(tick:number):void;
        running:boolean;
    }
}
