

/*
* name;
*/
module com 
{
    export interface JTIHttpChannel extends JTIChannel
    {
        defaultMethodType:string;

        writeMethod(methodType: string):void
    }
}