 module com 
{
    export class JTChannelPipeline extends JTEventDispatcher implements JTIChannelPipeline
    {
        private _channel:JTIChannel = null;
        private ___ctxMap:{[type:string]: JTIChannelContext} = {};
        private ___ctxs:JTIChannelContext[] = []
        private __channelGroup:JTIChannelGroup = null;

        private _inMessages:any[] = null;
        private _outMessage:any[] = null;
        constructor(channelGroup?:JTIChannelGroup)
        {
            super();
            this.__channelGroup = channelGroup;
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

        public flush(): void 
        {
            this._channel.flush();
        }

        public send(data: any): void 
        {
            this._channel.send(data);
        }

        public writeAndFlush(data: any): void 
        {
             this._channel.writeAndFlush(data);
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
            ___c.bind(this);
            ___c.build();
            this.___ctxMap[type] =  ___c;
            this.___ctxs.push(___c);
            return this;
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