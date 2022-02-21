

/*
* name;
*/
module com 
{
    export interface JTIRunnableTask extends JTIRunnable
    {
        relevance(index:number, counter:JTILocker):void;

        isCompleted():boolean;
    }
}