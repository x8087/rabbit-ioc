

/*
* name;
*/
namespace com 
{
    export interface JTITaskExecutor extends JTITask
    {
        relevance(counter:JTCounter, index:number):void;
    }
}