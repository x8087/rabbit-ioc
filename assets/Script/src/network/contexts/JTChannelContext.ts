 
namespace com 
{
    export abstract class JTChannelContext extends JTEventDispatcher implements JTIChannelContext
    {
        protected _channel:JTIChannel = null;
        protected _channelPipeline:JTIChannelPipeline = null;

        public static ENCODE:string = "encode";
        public static DECODE:string = "decode";
        public static IDLE:string = "idle";
        constructor()
        {
            super();
        }

        public abstract channelInactive():void;
  
        public abstract build():void;
        
        public getContext(type: string): JTIChannelContext 
        {
            return this._channelPipeline.getContext(type);
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
