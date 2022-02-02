

/*
* name;
*/
module com 
{
    export interface JTIAsyncTask extends JTIRunnable
    {
        relevance(counter:JTILocker):void;
    }
}