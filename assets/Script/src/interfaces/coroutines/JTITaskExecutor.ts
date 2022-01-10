

/*
* name;
*/
namespace com 
{
    export interface JTITaskExecutor extends JTITask
    {
        relevance(locker:JTLocker, index:number):void;
    }
}