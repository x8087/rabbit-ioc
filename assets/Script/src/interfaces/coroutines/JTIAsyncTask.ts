

/*
* name;
*/
module com 
{
    export interface JTIRunnableTask extends JTIRunnable
    {
        relevance(counter:JTILocker):void;
    }
}