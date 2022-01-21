

/*
* name;
*/
namespace com 
{
    export interface JTIHttpChannel extends JTIChannel
    {
        defaultMethodType:string;

        writeMethod(methodType: string):void
    }
}