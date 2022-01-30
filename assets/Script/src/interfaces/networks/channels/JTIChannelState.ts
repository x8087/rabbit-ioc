

/*
* name;
*/
module com 
{
    export interface JTIChannelState extends JTIChannelContextMap
    {
        channelInactive():void

        channel:JTIChannel;

        channelActive():void;
    }
}