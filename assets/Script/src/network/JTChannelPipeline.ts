 namespace com 
{
    export class JTChannelPipeline extends JTEventDispatcher implements JTIChannelPipeline
    {
        private _channel:JTIChannel = null;
        private _pipelineMap:{[type:string]: JTIChannelAdapter} = {};
        constructor()
        {
            super();
        }

        public bind(channel:JTIChannel):JTIChannel
        {
            this._channel = channel;
            this._channel.bind(this);
            JTSession.channel = this._channel;
            return this._channel;
        }

        public childOption(type:string, channelAdapter:JTIChannelAdapter):JTChannelPipeline
        {
            channelAdapter.bind(this);
            channelAdapter.channelActive();
            this._pipelineMap[type] =  channelAdapter;
            return this;
        }

        public getOption(type:string):JTIChannelAdapter
        {
            return this._pipelineMap[type];
        }

        public launch(host:string, port:number):JTIChannel
        {
            this._channel.reload();
            this._channel.connect(host, port);
            return this._channel;
        }

        public get channel():JTIChannel
        {
            return this._channel;
        }
    }
}