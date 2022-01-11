namespace com 
{
    export class JTWebSocketChannel extends JTChannel
    {
        protected _connected:boolean = false;
        protected _buffers:any[] = null;
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

        public connect(host:string, port:number):any
        {
            var channel:JTWebSocket = super.connect(host, port);
            channel.addEventListener(JTWebSocket.OPEN, this.onConnectSucceed, this);
            channel.addEventListener(JTWebSocket.MESSAGE, this.onReceiveMessage, this);
            channel.addEventListener(JTWebSocket.CLOSE, this.onCloseHandler, this);
            channel.addEventListener(JTWebSocket.ERROR, this.onErrorHandler, this);
            channel.connect(host, port);
        }

        protected onConnectSucceed(e):void
        {
            JTLogger.info("connect succeed!")
            this.flush();
            JTFunctionManager.execute(JTWebSocket.OPEN);
        }

        protected onReceiveMessage(data:any):void
        {
            let decoder:JTIDecoderAdapter = this._decoder;
            let message:any = decoder.decode(data);
            decoder.readComplete(message);
        }

        protected onCloseHandler(e):void
        {
            JTLogger.info("the server already close");
        }

        protected onErrorHandler(e):void
        {
            JTLogger.info("current connect error")
        }
    }
}
