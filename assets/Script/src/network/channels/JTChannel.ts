module com 
{
    export abstract class JTChannel extends JTEventDispatcher implements JTIChannel
    {
        protected _cls:any = null;
        protected _port:number = 0;
        protected _host:string = null;
        protected _channel:any = null;
        protected __name:string = "";

        protected _pipeline:JTIChannelPipeline = null;
        protected _channelRead:JTIChannelRead = null;
        protected _channelWrite:JTIChannelWrite = null;
        // protected _encoder:JTIEncoderAdapter = null;
        // protected _decoder:JTIDecoderAdapter = null;
        protected _connectUrl:string = null;

        constructor(cls:any)
        {
            super();
            if (cls)this._cls = cls;
            else
            {
                this._cls = this instanceof JTWebSocketChannel ? JTWebSocket : JTHttpRequest;
            }
        }

        public channelWrite(data:any): void 
        {
            this._channelWrite.channelWrite(data);
        }

        public abstract flush():void;

        public abstract send(data:any):void;

        public config(host:string, port:number):void
        {
            this._host = host;
            this._port = port;
        }

        public connect():any
        {
            if (this._channel) this._channel.clean();
            else this._channel = new this._cls();
            return this._channel;
        }

        public reload():void 
        {
            this._channelRead = this._pipeline.getContext(JTChannelContext.CHANNEL_READ) as JTIChannelRead
            this._channelWrite = this._pipeline.getContext(JTChannelContext.CHANNEL_WRITE) as JTIChannelWrite
            // this._encoder = this._pipeline.getContext(JTChannelContext.ENCODE) as JTIEncoderAdapter;
            // this._decoder = this._pipeline.getContext(JTChannelContext.DECODE) as JTIDecoderAdapter;
        }

        protected onReceiveMessage(data:any):void
        {
            this._channelRead.channelRead(data);
            // let decoder:JTIDecoderAdapter = this._decoder;
            // let message:any = decoder.decode(data);
            // decoder.readComplete(message);
        }

        public writeAndFlush(data:any):void
        {
            this.flush();
            this.send(data);
        }

        public get name():string
        {
            return this.__name;
        }

        public set name(value:string)
        {
            this.__name = value;
        }

        public bind(channelPipeline:JTIChannelPipeline):void
        {
            this._pipeline = channelPipeline;
        }

        public get url():string
        {
            return this._connectUrl;
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
