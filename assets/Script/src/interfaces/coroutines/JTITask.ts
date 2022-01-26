

/*
* name;
*/
module com 
{
    export interface JTITask extends JTIPoolObject
    {
        execute():Promise<any>
    }
}