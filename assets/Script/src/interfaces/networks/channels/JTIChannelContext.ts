module com 
{
    export interface JTIChannelContext extends JTIEventDispatcher, JTIChannelState, JTIChannelContextMap
    {

        build():void;
        
        bind(channelPipeline:JTIChannelPipeline):void

    }
}