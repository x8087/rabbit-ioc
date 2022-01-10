namespace com 
{
    export interface JTIChannelAdapter extends JTIEventDispatcher
    {
        channel:JTIChannel;

        channelActive():void;
        
        bind(channelPipeline:JTIChannelPipeline):void

        getOption(type:string):JTIChannelAdapter
       
    }
}