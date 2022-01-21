///<reference path="../events/JTEventSignaler.ts"/>
namespace com 
{
    export abstract class JTApplicationBootstrap extends JTEventSignaler implements JTIOption
    {
        protected static _contextMap:{[name:string]:any} = {};

        private static ____ctx:JTIApplicationContext[] = []

        public static CONTEXT_PROTOCOL:string = "Context_Protocol";

        public static CONTEXT_ERROR_MESSAGE:string = "Context_ErrorMessage";

        public static CONTEXT_TEMPLATE:string = "Context_Template";

        public static CONTEXT_MAPPING:string = "Context_Response_Mapping";

        public static CONTEXT_SCENE:string = "Context_Scene";

        public static CONTEXT_LAYER:string = "Context_Layer";

        public static CONTEXT_RUNNER:string = "Context_RUNNER";

        protected static CONTEXT_LAYOUT:string = "Context_Layout";

        public static CHANNEL:string = "Channel";
        public static WEBSOCKET_CHANNEL:string = "Websocket_Channel";
        public static HTTP_CHANNEL:string = "Http_Channel";
        public static CHANNEL_PIPELINE:string = "Pipeline";

        private _serverLoader:JTTextLoader = null;
        private _serverTemplate:JTServerConfigTemplate = null;

        private __loaderManager:JTFuturePipeline = null;
        private _launchConnected:boolean = false;



        constructor()
        {
            super();
        }

        /**
         * 选项必须继承--JTApplicationContext
         * @param type 类型
         * @param _context 扩展上下文
         * @returns 
         */
        public option(type: string, _context: JTIApplicationContext): JTIChildOption 
        {
            return this.registerContextAlias(type, _context) as JTIChildOption
        }

        /**
         * 构建上下文对象
         */
        protected buildContexts():void
        {
            let __contexts:JTIApplicationContext[] = JTApplicationBootstrap.____ctx;
            let count:number = __contexts.length;
            for (let i:number = 0; i < count; i++)
            {
                let ___c:JTIApplicationContext = __contexts[i];
                ___c.build();
            }
        }

        /**
         * 构建上下文对象
         */
        protected buildComplete():void
        {
            let __contexts:JTIApplicationContext[] = JTApplicationBootstrap.____ctx;
            let count:number = __contexts.length;
            for (let i:number = 0; i < count; i++)
            {
                let __c:JTIApplicationContext = __contexts[i];
                __c.buildComplete();
            }
        }

        /**
         * 框架通信连接
         * @param channel 
         * @returns 
         */
        public channel(channel:JTIChannel):JTIChannelOption
        {
            this.buildContexts();
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
        public childOption(type:string, channelAdapter:JTIChannelContext):JTIChannelOption
        {
            let channelPipeline:JTIChannelPipeline = this.getContext(JTApplicationBootstrap.CHANNEL_PIPELINE);
            channelPipeline.childOption(type, channelAdapter);
            return this;
        }

        public layout(layoutType:string):JTIChildOption
        {
            JTLayoutManager.currentLayout = layoutType;
            return this.registerContextAlias(JTApplicationBootstrap.CONTEXT_LAYOUT, new JTLayoutManager());
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
            if (this.__loaderManager) this.__loaderManager.run();
            this.buildComplete();
            let channel:JTIChannel = this.connect();
            this.launchSucceed();
            return channel;
        }

        protected abstract launchSucceed():void

        /**
         * 加载资源
         * @param assets 任务列表
         * @param createRender 创加加载器的回调函数 ---- 需要继承JTTaskExecutor类
         * @returns 返回任务执行队列
         */
        public preloadAssets(assets:{[url:string]:string}[], createRender?:JTCommand):JTFuturePipeline
        {
            if (!this.__loaderManager)
            {
                this.__loaderManager = new JTFuturePipeline();
            }
            else
            {
                this.__loaderManager.reset();
            }
            this.__loaderManager.dataList = assets;
            this.__loaderManager.itemRender = createRender;
            return this.__loaderManager;
        }

        /**
         * 加载
         * 需要配合await一起使用 
         */
        public async load():Promise<any>
        {
           await this.__loaderManager.run();
        }

        public setDesignResolutionSize(width:number, height:number, resolutionPolicy?:string | number):void
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
            let templateManager:JTAbstractTemplateManager = this.getContext(JTApplicationBootstrap.CONTEXT_TEMPLATE) as JTAbstractTemplateManager;
            templateManager.updateConfigs(resources);
        } 

        public registerContextAlias(key:string, __context:any):JTIOption
        {
            JTApplicationBootstrap._contextMap[key] = __context;
            let contexts:JTIApplicationContext[] = JTApplicationBootstrap.____ctx;
            if (__context instanceof JTApplicationContext)  contexts.push(__context);
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