

/*
* name;
*/
module com 
{
    export interface JTIChannel extends JTIConnection
    {
        host:string;
        port:number;

        name:string;

        pipeline:JTIChannelPipeline;

        bind(channelPipeline:JTIChannelPipeline):void

        config(host:string, port:number):any;

        connect():any;
    }
}