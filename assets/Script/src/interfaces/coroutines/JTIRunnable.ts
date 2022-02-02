

/*
* name;
*/
module com 
{
    export interface JTIRunnable extends JTIPoolObject
    {
        run():any;

        id:number | string;
    }
}