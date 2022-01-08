namespace com 
{
    export interface JTITaskTimer  
    {
        updateTick(tick:number):void;
        
        running:boolean;
    }
}
