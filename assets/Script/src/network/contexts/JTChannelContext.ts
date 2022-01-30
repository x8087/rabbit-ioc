 
module com 
{
    export abstract class JTChannelContext extends JTEventDispatcher implements JTIChannelContext
    {
        protected _channel:JTIChannel = null;
        protected _channelPipeline:JTIChannelPipeline = null;

        public static ENCODE:string = "encode";
        public static DECODE:string = "decode";
        public static IDLE:string = "idle";
        public static LOGGER:string = "logger";
        public static HANDLER:string = "handler";
        public static CHANNEL_READ:string = "channel_read";
        public static CHANNEL_WRITE:string = "channel_write";

        protected _responseMapper:JTAbstractResponseMapping = null;
        protected _protocolContext:JTAbstractProtocolManager = null;
        protected _errorMessageContext:JTAbstractProtocolErrorMessage = null;

        constructor()
        {
            super();
        }

        public abstract channelInactive():void;
  
        public build(): void 
        {
            this._responseMapper = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_MAPPING)
            this._protocolContext = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_PROTOCOL);
            this._errorMessageContext = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_ERROR_MESSAGE);
        }
        
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

        public get sortId():number
        {
            return  9999999;
        }
    }
}
