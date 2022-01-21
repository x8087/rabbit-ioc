///<reference path="JTChannel.ts"/>
namespace com 
{
    export class JTHttpChannel extends JTChannel implements JTIHttpChannel
    {

        public static METHOD_GET:string = "get";
        public static METHOD_POST:string = "post";

        private __defaultMethodType:string = JTHttpChannel.METHOD_POST;

        constructor(cls:any)
        {
            super(cls);
        }

        public flush():void 
        {
            
        }

        public writeMethod(methodType: string):void
        {
                this.__defaultMethodType = methodType;
        }

        /**
         * 发送表单--字符串
         */
        public send(data:any):void 
        {
            let protocol:number | string = data["protocol"];
            let message:any = this._encoder.encode(data);
            let httpChannel:JTHttpRequest = this._channel as JTHttpRequest;
            httpChannel.send(this._connectUrl + protocol, message, this.__defaultMethodType);
            this._encoder.writeComplete(message);
        }

       /**
         * 发送表单--JSON 字符串
         */
        public sendForm():void
        {

        }

        
        public sendGetToHeader():void
        {

        }

        public sendGetToUrl():void
        {
            
        }

        public get defaultMethodType():string
        {
            return this.__defaultMethodType;
        }

        public config(host:string, port:number):any
        {
            super.config(host, port);
            this._connectUrl = host + ":" + port;
        }

        public connect():any
        {
            var channel:JTHttpRequest = super.connect() as JTHttpRequest;
            channel.addEventListener(JTHttpRequest.COMPLETE, this.onReceiveMessage, this);
            channel.addEventListener(JTHttpRequest.ERROR, this.onErrorHandler, this);
            this.pipeline.channelActive();
            return channel;
        }
        
        protected onReceiveMessage(data:any):void
        {
            let decoder:JTIDecoderAdapter = this._decoder;
            let message:any = decoder.decode(data);
            decoder.readComplete(message);
        }

        protected onErrorHandler(e) 
        {
            JTLogger.info("the send package error!");
            this.pipeline.channelInactive();
        }

    }
}