

/*
* name;
*/
module com 
{
    export interface JTIChannelState
    {
        channelInactive():void

        channel:JTIChannel;

        channelActive():void;

        getContext(type:string):JTIChannelContext
    }
}