namespace com 
{
    export interface JTIChannelOption
    {
        childOption(type:string, channelAdapter:JTIChannelAdapter):JTIChannelOption
    }
}