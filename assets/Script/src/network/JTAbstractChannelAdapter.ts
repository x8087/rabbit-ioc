 
namespace com 
{
    export abstract class JTAbstractChannelAdapter extends JTEventDispatcher implements JTIChannelAdapter
    {
        protected _channel:JTIChannel = null;
        protected _channelPipeline:JTIChannelPipeline = null;
        constructor()
        {
            super();
        }
        
        public getOption(type: string): JTIChannelAdapter 
        {
            return this._channelPipeline.getOption(type);
        }
        
        public abstract channelActive():void;

        public get channel():JTIChannel
        {
            return this._channel;
        }

        public bind(channelPipeline:JTIChannelPipeline):void
        {
            this._channelPipeline = channelPipeline;
            this._channel = channelPipeline.channel;
        }
    }
}
