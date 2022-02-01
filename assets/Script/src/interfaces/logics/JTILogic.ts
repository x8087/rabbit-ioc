module com 
{
    export interface JTILogic
    {
        index:number;

        currentLogic:string | number;
        
        controller:JTLogicController;

        updateLogic():void;
    }
}
