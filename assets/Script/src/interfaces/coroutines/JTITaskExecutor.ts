

/*
* name;
*/
module com 
{
    export interface JTITaskExecutor extends JTITask
    {
        relevance(counter:JTCounter):void;
    }
}