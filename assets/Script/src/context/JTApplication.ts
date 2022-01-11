///<reference path="../events/JTEventSignaler.ts"/>
namespace com 
{
    export abstract class JTApplication extends JTEventSignaler implements JTIOption
    {
        protected static extensionClassMap:{[name:string]:any} = {};

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

        private _taskPipeline:JTFuturePipeline = null;

        constructor()
        {
            super();
        }
        public option(type: string, _extension: JTIClassExtension): JTIChildOption 
        {
            return this.registerClassAlias(type, _extension) as JTIChildOption
        }

        // protected builds():void
        // {
        //     this.buildExecutions();
        //     // this.buildLayers();
        // }

        // protected buildLayers():void
        // {
        //     let layerManager:JTLayerManager = this.getExtensionItem(JTApplication.LAYER) as JTLayerManager;
        //     let sceneManager:JTSceneManager = this.getExtensionItem(JTApplication.SCENE);
        //     sceneManager.layer = layerManager.getLayer(JTLayerManager.LAYER_SCENE)
        // }

        /**
         * 构建扩展对象
         */
        protected buildExecutions():void
        {
            let extensionMap:Object = JTApplication.extensionClassMap;
            for (var key in extensionMap)
            {
                let _class:JTClassExtension = extensionMap[key];
                _class.build();
            }
        }

        /**
         * 框架通信连接
         * @param channel 
         * @returns 
         */
        public channel(channel:JTIChannel):JTIChannelOption
        {
            this.buildExecutions();
            this.registerClassAlias(JTApplication.CHANNEL, channel);
            let channelPipeline:JTIChannelPipeline = new JTChannelPipeline();
            channelPipeline.bind(channel);
            return this.registerClassAlias(JTApplication.CHANNEL_PIPELINE, channelPipeline);
        }

        /**
         * 通信选项
         * @param type 适配器类型
         * @param channelAdapter 适配器
         * @returns 
         */
        public childOption(type:string, channelAdapter:JTIChannelAdapter):JTIChannelOption
        {
            let channelPipeline:JTIChannelPipeline = this.getExtensionItem(JTApplication.CHANNEL_PIPELINE);
            channelPipeline.childOption(type, channelAdapter);
           return this;
        }
        
        /**
         * 使用模板配置服务器连接
         * 该方法和launch()一起使用
         * @param serverLoader 服务器地址和端口配置
         * @param serverId 服务器ID
         */
        public config(serverLoader:JTTextLoader, serverId:string):void
        {
            this._serverLoader = serverLoader;
            this._serverTemplate = serverLoader.toValue(serverId);
        }

        /**
         * 连接网络
         * @param host 服务器域名
         * @param port 服务器端口
         */
        public connect(host:string, port:number):JTIChannel 
        {
            let channelPipeline:JTIChannelPipeline = this.getExtensionItem(JTApplication.CHANNEL_PIPELINE);
            return channelPipeline.launch(host, port);

        }

        /**
         * 启动框架
         */
        public launch():void
        {
            this.connect(this._serverTemplate.host, this._serverTemplate.port)
        }

        /**
         * 加载配置文件列表
         * @param list 任务列表
         * @param createRender 创加加载器的回调函数 ---- 需要继承JTTaskExecutor类
         * @returns 返回任务执行队列
         */
        public loadConfigs(list:{[url:string]:string}[], createRender?:Function):JTFuturePipeline
        {
            if (!this._taskPipeline)
            {
                this._taskPipeline = new JTFuturePipeline(list.length);
            }
            this._taskPipeline.itemRender = JTEvent.create(createRender.caller, createRender);
            return this._taskPipeline;
        }
 
        /**
         * 更新模板配置
         * @param resources 
         */
        public updateConfigs(resources:any[]):void
        {
            let templateManager:JTTemplateBaseManager = this.getExtensionItem(JTApplication.TEMPLATE);
            templateManager.updateConfigs(resources);
        } 

        public registerClassAlias(key:string, __extensionClass:any):JTIOption
        {
            JTApplication.extensionClassMap[key] = __extensionClass;
            return this;
        }

        public getExtensionItem(key:string):any
        {
            return JTApplication.extensionClassMap[key];
        }

        public static getExtensionItem(key:string):any
        {
            return this.extensionClassMap[key];
        }
    }
}
