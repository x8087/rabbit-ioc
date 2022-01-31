

/*
* name;
*/
module com 
{
    export interface JTITaskLocker extends JTILocker
    {
        signal:Promise<any>;
    }
}