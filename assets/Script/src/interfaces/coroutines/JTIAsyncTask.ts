

/*
* name;
*/
module com 
{
    export interface JTIAsyncTask extends JTITask
    {
        relevance(counter:JTITaskCounter):void;
    }
}