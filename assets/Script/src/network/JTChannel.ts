namespace com 
{
    export abstract class JTChannel extends JTEventDispatcher implements JTIChannel
    {
        protected _cls:any = null;
        protected _port:number = 0;
        protected _host:string = null;
        protected _channel:any = null;

        protected _pipeline:JTIChannelPipeline = null;
        protected _encoder:JTIEncoderAdapter = null;
        protected _decoder:JTIDecoderAdapter = null;
        protected _idleState:JTChannelAdapter = null;
        constructor(cls:any)
        {
            super();
            this._cls = cls;
        }

        abstract flush():void

        abstract send(data:any):void 

        public connect(host:string, port:number):any
        {
            this._host = host;
            this._port = port;

            if (this._channel) this._channel.clean();
            else this._channel = new this._cls();
            return this._channel;
        }

        public reload():void 
        {
            this._encoder = this._pipeline.getAdapter(JTChannelAdapter.ENCODE) as JTAbstractEncoderAdapter;
            this._decoder = this._pipeline.getAdapter(JTChannelAdapter.DECODE) as JTAbstractDecoderAdapter;
            this._idleState = this._pipeline.getAdapter(JTChannelAdapter.IDLE) as JTAbstractIdleStateAdapter;
        }

        public bind(channelPipeline:JTIChannelPipeline):void
        {
            this._pipeline = channelPipeline;
        }

        public get pipeline():JTIChannelPipeline
        {
            return this._pipeline
        }

        public get host():string
        {
            return this._host;
        }

        public get port():number
        {
            return this._port;
        }
    }
}
