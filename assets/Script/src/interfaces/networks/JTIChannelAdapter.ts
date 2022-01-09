namespace com 
{
    export interface JTIChannelAdapter extends JTIEventDispatcher
    {
        channel:JTIChannel;

        channelActive():void;
        
        bind(channel:JTIChannel):void
       
    }
}