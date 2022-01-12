///<reference path="../events/JTEventSignaler.ts"/>
namespace com 
{
    export abstract class JTApplicationBootstrap extends JTEventSignaler implements JTIOption
    {
        protected static _contextMap:{[name:string]:any} = {};

        private static _contexts:JTIApplicationContext[] = []

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
        private _launchConnected:boolean = false;



        constructor()
        {
            super();
        }

        /**
         * 
         * @param type 
         * @param _context 
         * @returns 
         */
        public option(type: string, _context: JTIApplicationContext): JTIChildOption 
        {
            return this.registerContextAlias(type, _context) as JTIChildOption
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
            let contextMap:Object = JTApplicationBootstrap._contextMap;
            for (var key in contextMap)
            {
                let _class:JTApplicationContext = contextMap[key];

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
            this.registerContextAlias(JTApplicationBootstrap.CHANNEL, channel);
            let channelPipeline:JTIChannelPipeline = new JTChannelPipeline();
            channelPipeline.bind(channel);
            return this.registerContextAlias(JTApplicationBootstrap.CHANNEL_PIPELINE, channelPipeline);
        }

        /**
         * 通信选项
         * @param type 适配器类型
         * @param channelAdapter 适配器
         * @returns 
         */
        public childOption(type:string, channelAdapter:JTIChannelAdapter):JTIChannelOption
        {
            let channelPipeline:JTIChannelPipeline = this.getContext(JTApplicationBootstrap.CHANNEL_PIPELINE);
            channelPipeline.childOption(type, channelAdapter);
            return this;
        }
        
        /**
         * 使用模板配置服务器连接
         * 该方法和launch()一起使用
         * @param serverLoader 服务器地址和端口配置
         * @param serverId 服务器ID
         */
        public configServerTemaplete(serverLoader:JTTextLoader, serverId:string):JTServerConfigTemplate
        {
            this._serverLoader = serverLoader;
            this._serverTemplate = serverLoader.toValue(serverId);
            return this._serverTemplate
        }

        /**
         * 配置网络
         * 该方法和launch()一起使用
         * @param host 服务器域名
         * @param port 服务器端口
         */
        public conofig(host:string, port:number):JTServerConfigTemplate 
        {
            this._serverTemplate = new JTServerConfigTemplate();
            this._serverTemplate.setup(host, port);
            return this._serverTemplate;
        }

        public connect():JTIChannel
        {
            let channel:JTIChannel = null;
            if (!this._launchConnected)
            {
                let channelPipeline:JTIChannelPipeline = this.getContext(JTApplicationBootstrap.CHANNEL_PIPELINE);
                channel = channelPipeline.launch(this._serverTemplate.host, this._serverTemplate.port);
                this._launchConnected = true;
            }
            return channel;
        }

        /**
         * 启动框架
         */
        public launch():JTIChannel
        {
            if (this._taskPipeline) this._taskPipeline.run();
            let layerManager:JTLayerManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.LAYER);
            
            return this.connect();
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

        public setDesignResolutionSize(width:number, height:number, resolutionPolicy:string | number):void
        {
            JTSession.stageWidth = width;
            JTSession.stageHeight = height;
        }
 
        /**
         * 更新模板配置
         * @param resources 
         */
        public updateConfigs(resources:any[]):void
        {
            let templateManager:JTTemplateBaseManager = this.getContext(JTApplicationBootstrap.TEMPLATE) as JTTemplateBaseManager;
            templateManager.updateConfigs(resources);
        } 

        public registerContextAlias(key:string, _contextClass:any):JTIOption
        {
            JTApplicationBootstrap._contextMap[key] = _contextClass;
            return this;
        }

        public getContext(key:string):any
        {
            return JTApplicationBootstrap._contextMap[key];
        }

        public static getContext(key:string):any
        {
            return this._contextMap[key];
        }
    }
}
