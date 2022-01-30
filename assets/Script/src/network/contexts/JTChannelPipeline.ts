 module com 
{
    export class JTChannelPipeline extends JTEventDispatcher implements JTIChannelPipeline
    {
        private _channel:JTIChannel = null;
        private ___ctxMap:{[type:string]: JTIChannelContext} = {};
        private ___ctxs:JTIChannelContext[] = [];
        private __channelGroup:JTIChannelGroup = null;

 
        private __readChannelEventLoop:JTIChannelRead = null;
        private __writeChannelEventLoop:JTIChannelWrite = null;

        constructor(channelGroup?:JTIChannelGroup)
        {
            super();
            this.__channelGroup = channelGroup;

        }
        
        public channelWrite(data: any): void 
        {
            this.__writeChannelEventLoop.channelWrite(data);
        }

        public setEventLoopGroup(channelReadEventLoop:JTChannelEventLoop, channelWriteEventLoop:JTChannelEventLoop):void
        {
            this.__readChannelEventLoop = channelReadEventLoop as any;
            this.__writeChannelEventLoop = channelWriteEventLoop as any;
            this.registerChannelContext(JTChannelContext.CHANNEL_READ, channelReadEventLoop);
            this.registerChannelContext(JTChannelContext.CHANNEL_WRITE, channelWriteEventLoop);
        }

        protected registerChannelContext(type:string, __c:JTIChannelContext):void
        {
            __c.bind(this);
            __c.build();
            this.___ctxs.push(__c);
            this.___ctxMap[type] = __c;
        }
        
        public mark():void 
        {
           this.__channelGroup && this.__channelGroup.mark(this);
        }

        public config(host:string, port:number):JTIMarkConnected
        {
            this._channel.reload();
            this._channel.config(host, port);
            return this;
        }

        public connect():any
        {
           return this._channel.connect();
        }

        public reload(): void 
        {
            this._channel.reload();
        }

        public flush():void 
        {
            this.channel.flush();
        }

        public send(data:any): void 
        {
           this.channel.send(data);
        }

        public writeAndFlush(data:any): void 
        {
            this.channel.writeAndFlush(data);
        }

        public channelActive():void
        {
            for (let i:number = 0; i < this.___ctxs.length; i++)
            {
                let ___c:JTIChannelContext = this.___ctxs[i];
                ___c.channelActive();
            }
        }

        public channelInactive():void
        {
            for (let i:number = 0; i < this.___ctxs.length; i++)
            {
                let ___c:JTIChannelContext = this.___ctxs[i];
                ___c.channelInactive();
            }
        }

        /**
         * 
         * @param channel 
         * @returns 
         */
        public bind(channel:JTIChannel):JTIChannel
        {
            this._channel = channel;
            this._channel.bind(this);
            JTSession.channel = this._channel;
            return this._channel;
        }

        /**
         * 
         * @param type 
         * @param ___c 
         * @returns 
         */
        public childOption(type:string, ___c:JTIChannelContext):JTChannelPipeline
        {
            this.registerChannelContext(type, ___c)

            this.___ctxs.sort(this.compare);
            if (___c["channelRead"])(this.__readChannelEventLoop as any).childOption(type, ___c);
            if (___c["channelWrite"]) (this.__writeChannelEventLoop as any).childOption(type, ___c);
            return this;
        }

        protected compare(a:JTChannelContext, b:JTChannelContext):number
        {
                return a.sortId - b.sortId;
        }

        public getContext(type:string):JTIChannelContext
        {
            return this.___ctxMap[type];
        }

        public launch(host:string, port:number):JTIChannel
        {
            this._channel.reload();
            this._channel.config(host, port);
            this._channel.connect();
            return this._channel;
        }

        public get channel():JTIChannel
        {
            return this._channel;
        }
    }
}