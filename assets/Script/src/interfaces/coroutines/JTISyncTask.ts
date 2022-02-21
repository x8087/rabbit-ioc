

/*
* name;
*/
module com 
{
    export interface JTISyncTask extends JTIRunnable
    {
        relevance(counter:JTILocker):void;
    }
}