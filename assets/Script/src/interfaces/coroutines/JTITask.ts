

/*
* name;
*/
module com 
{
    export interface JTITask extends JTIPoolObject
    {
        run():Promise<any>
    }
}