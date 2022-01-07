namespace com 
{
    export interface JTIScheduleFrame  extends JTIEnterFrame
    {
       frames:any[];
        
       createFrames:JTCommand;

       currentItem:any;
    }
}
