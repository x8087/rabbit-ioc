

/*
* name;
*/
namespace com 
{
    export interface JTITask extends JTIPoolObject
    {
        execute():Promise<any>
    }
}