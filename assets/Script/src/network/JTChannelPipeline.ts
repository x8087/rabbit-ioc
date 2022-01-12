 namespace com 
{
    export class JTChannelPipeline extends JTEventDispatcher implements JTIChannelPipeline
    {
        private _channel:JTIChannel = null;
        private __contextMap:{[type:string]: JTIChannelContext} = {};
        private ___ctxs:JTIChannelContext[] = []
        constructor()
        {
            super();
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
            this.__contextMap[type] =  ___c;
            this.___ctxs.push(___c);
            return this;
        }

        public getContext(type:string):JTIChannelContext
        {
            return this.__contextMap[type];
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