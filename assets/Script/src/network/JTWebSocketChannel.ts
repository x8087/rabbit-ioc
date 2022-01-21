///<reference path="JTChannel.ts"/>
namespace com 
{
    export class JTWebSocketChannel extends JTChannel
    {
        protected _connected:boolean = false;
        protected _buffers:any[] = null;
        protected _idleState:JTIChannelContext = null;
        constructor(cls:any)
        {
            super(cls);
            this._buffers = [];
        }

        public flush():void 
        {
            let socket:JTWebSocket = this._channel as JTWebSocket;
            while(this._buffers.length)
            {
                let msg:any = this._buffers.shift();
                if (socket)
                {   
                    socket.connected && socket.send(msg);
                    this._encoder.writeComplete(msg);
                }
            }
        }

        public send(data:any):void 
        {
            let message:any = this._encoder.encode(data);
            let socket:JTWebSocket = this._channel as JTWebSocket;
            if (socket && socket.connected)
            {   
                socket.send(message);
                this._encoder.writeComplete(message);
            }
            else
            {
                this._buffers.push(message);
                JTLogger.info("send error, the websocket cant send msg to server!");
            }
        }

        public config(host:string, port:number):any
        {
            super.config(host, port);
            this._connectUrl = "ws://" + host + ":" + port;
        }

        public connect():any
        {
            var channel:JTWebSocket = super.connect() as JTWebSocket;
            channel.addEventListener(JTWebSocket.OPEN, this.onConnectSucceed, this);
            channel.addEventListener(JTWebSocket.MESSAGE, this.onReceiveMessage, this);
            channel.addEventListener(JTWebSocket.CLOSE, this.onCloseHandler, this);
            channel.addEventListener(JTWebSocket.ERROR, this.onErrorHandler, this);
            channel.connect(this._host, this.port);
            return channel;
        }

        protected onConnectSucceed(e):void
        {
            JTLogger.info("connect succeed!")
            this.pipeline.channelActive();
            this.flush();
            JTFunctionManager.execute(JTWebSocket.OPEN);
        }

        protected onCloseHandler(e):void
        {
            this.pipeline.channelInactive();
            JTLogger.info("the server already close");
        }

        protected onErrorHandler(e):void
        {
            this.pipeline.channelInactive();
            JTLogger.info("current connect error")
        }

        public reload():void 
        {
            super.reload();
            this._idleState = this._pipeline.getContext(JTChannelContext.IDLE) as JTIChannelContext;
        }
    }
}
