 namespace com 
{
    export class JTChannelPipeline extends JTEventDispatcher implements JTIChannelPipeline
    {
        private _channel:JTIChannel = null;
        private _pipelineMap:Object = {};
        constructor()
        {
            super();
        }

        public bind(channel:JTIChannel):JTIChannel
        {
            this._channel = channel;
            this._channel.bind(this);
            JTSession.socketChannel = this._channel;
            return this._channel;
        }

        public childOption(type:string, channelAdapter:JTChannelAdapter):JTChannelPipeline
        {
            channelAdapter.bind(this._channel);
            channelAdapter.channelActive();
            this._pipelineMap[type] =  channelAdapter;
            return this;
        }

        public getOption(type:string):JTChannelAdapter
        {
            return this._pipelineMap[type];
        }

        public launch(host:string, port:number):void
        {
            this._channel.reload();
            this._channel.connect(host, port);
        }

        public get channel():JTIChannel
        {
            return this._channel;
        }
    }
}