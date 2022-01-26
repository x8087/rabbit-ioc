

/*
* name;
*/
module com 
{
    export interface JTIConnection
    {
        connect():any;

        reload():void;

        flush():void;

        send(data:any):void 

        writeAndFlush(data:any):void;
    }
}