module com 
{
    export interface JTIScheduleFrame  extends JTIEnterFrame
    {
       frames:any[];
        
       createFrames:JTHandler;

       currentItem:any;
    }
}
