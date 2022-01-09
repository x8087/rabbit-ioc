namespace com 
{
    export abstract class JTApplication extends JTEventSignaler implements JTIOption
    {
        protected static extensionMap:{[name:string]:any} = {};

        public static PROTOCOL:string = "ProtocolManager";

        public static ERROR_MESSAGE:string = "ErrorMessage";

        public static TEMPLATE:string = "TemplateManager";

        public static SCENE:string = "Scene";

        public static LAYER:string = "Layer";

        public static RUNNER:string = "Runner";

        public static CHANNEL:string = "Channel";
        public static WEBSOCKET_CHANNEL:string = "Websocket_Channel";
        public static HTTP_CHANNEL:string = "Http_Channel";
        public static CHANNEL_PIPELINE:string = "Pipeline";

        private static _locker:JTLocker = new JTLocker();

        constructor()
        {
            super();
        }
        public option(type: string, _extension: JTIExtensionClass): JTIChildOption 
        {
            return this.registerClassAlias(type, _extension) as JTIChildOption
        }

        protected builds():void
        {
            let extensionMap:Object = JTApplication.extensionMap;
            for (var key in extensionMap)
            {
                let _class:JTExtensionClass = extensionMap[key];
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

        public launch(host: string, port: number):void 
        {
            let channelPipeline:JTIChannelPipeline = this.getObject(JTApplication.CHANNEL_PIPELINE);
            channelPipeline.launch(host, port);
        }

        public loadSyncTemplates(list:any[]):void
        {
            
        }


        public updateConfigs(resources:any[]):void
        {
            let templateManager:JTTemplateBaseManager = this.getObject(JTApplication.TEMPLATE);
            templateManager.updateConfigs(resources);
        } 

        public registerClassAlias(key:string, runClass:any):JTIOption
        {
            JTApplication.extensionMap[key] = runClass
            return this;
        }

        public getObject(key:string):any
        {
            return JTApplication.extensionMap[key];
        }

        public static getObject(key:string):any
        {
            return this.extensionMap[key];
        }
    }
}
