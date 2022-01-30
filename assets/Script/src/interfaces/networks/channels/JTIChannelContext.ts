module com 
{
    export interface JTIChannelContext extends JTIEventDispatcher, JTIChannelState
    {
        build():void;
        
        bind(channelPipeline:JTIChannelPipeline):void
    }
}