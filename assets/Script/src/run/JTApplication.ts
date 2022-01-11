namespace com 
{
    export abstract class JTApplication extends JTEventSignaler implements JTIOption
    {
        protected static _classMap:{[name:string]:any} = {};

        public static PROTOCOL:string = "ProtocolManager";

        public static ERROR_MESSAGE:string = "ErrorMessage";

        public static TEMPLATE:string = "TemplateManager";

        public static MAPPING:string = "Mapping";

        public static SCENE:string = "Scene";

        public static LAYER:string = "Layer";

        public static RUNNER:string = "Runner";

        public static CHANNEL:string = "Channel";
        public static WEBSOCKET_CHANNEL:string = "Websocket_Channel";
        public static HTTP_CHANNEL:string = "Http_Channel";
        public static CHANNEL_PIPELINE:string = "Pipeline";

        private _serverLoader:JTTextLoader = null;
        private _serverTemplate:JTServerConfigTemplate = null;

        constructor()
        {
            super();
        }
        public option(type: string, _extension: JTIClassExtension): JTIChildOption 
        {
            return this.registerClassAlias(type, _extension) as JTIChildOption
        }

        protected builds():void
        {
            let extensionMap:Object = JTApplication._classMap;
            for (var key in extensionMap)
            {
                let _class:JTClassExtension = extensionMap[key];
                _class.build();
            }
        }

        public channel(channel:JTIChannel):JTIChannelOption
        {
            this.builds();
            this.registerClassAlias(JTApplication.CHANNEL, channel);
            let channelPipeline:JTIChannelPipeline = new JTChannelPipeline();
            channelPipeline.bind(channel);
            return this.registerClassAlias(JTApplication.CHANNEL_PIPELINE, channelPipeline);
        }

        public childOption(type:string, channelAdapter:JTIChannelAdapter):JTIChannelOption
        {
            let channelPipeline:JTIChannelPipeline = this.getObject(JTApplication.CHANNEL_PIPELINE);
            channelPipeline.childOption(type, channelAdapter);
           return this;
        }
        
        public config(serverLoader:JTTextLoader, serverId:string):void
        {
            this._serverLoader = serverLoader;
            this._serverTemplate = serverLoader.toValue(serverId);
        }

        public connect(host:string, port:number):void 
        {
            let channelPipeline:JTIChannelPipeline = this.getObject(JTApplication.CHANNEL_PIPELINE);
            channelPipeline.launch(host, port);
        }

        public launch():void
        {
            this.connect(this._serverTemplate.host, this._serverTemplate.port)
        }

        public loadSyncTemplates(list:any[]):void
        {
            
        }


 
        public updateConfigs(resources:any[]):void
        {
            let templateManager:JTTemplateBaseManager = this.getObject(JTApplication.TEMPLATE);
            templateManager.updateConfigs(resources);
        } 

        public registerClassAlias(key:string, extendsClass:any):JTIOption
        {
            JTApplication._classMap[key] = extendsClass
            return this;
        }

        public getObject(key:string):any
        {
            return JTApplication._classMap[key];
        }

        public static getExtendItem(key:string):any
        {
            return this._classMap[key];
        }
    }
}
