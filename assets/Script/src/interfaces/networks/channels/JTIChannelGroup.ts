

/*
* name;
*/
namespace com 
{
    export interface JTIChannelGroup extends JTIConnection
    {
        initialize():void

        mark(channel:JTIConnection):void

        addChannel(type:string, channel:JTIChannel):JTIChannelPipeline

        setupChannel(type:string, __channleClass:any):JTIChannelPipeline

        getChannelPipeline(type:string):JTIChannelPipeline

        getChannel(type:string):JTIChannel

        size:number;
    }
    
}