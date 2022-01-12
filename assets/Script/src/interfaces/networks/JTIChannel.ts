

/*
* name;
*/
namespace com 
{
    export interface JTIChannel
    {
        host:string;
        port:number;
        

        pipeline:JTIChannelPipeline;

        reload():void;

        bind(channelPipeline:JTIChannelPipeline):void

        flush():void;

        send(data:any):void 

        config(host:string, port:number):any;

        connect():void;
    }
}