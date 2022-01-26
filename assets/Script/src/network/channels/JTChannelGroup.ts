module com 
{
    export abstract class JTChannelGroup implements JTIChannelGroup
    {
        protected ___channelMap:{[channelType:string]: JTIChannel} = null;
        protected ___pipelineMap:{[channelType:string]: JTIChannelPipeline} = null;
        protected __connects:JTIConnection[] = null;
        protected __size:number = 0;
        public static WEBSOCKET_CHANNEL:string = "Websocket_Channel";
        public static HTTP_CHANNEL:string = "Http_Channel";

        constructor()
        {
            this.__connects = [];
            this.___channelMap = {};
            this.___pipelineMap = {};
        }

        public abstract initialize():void;

        public addChannel(type:string, channel:JTIChannel):JTIChannelPipeline
        {
            let ___pipeline:JTIChannelPipeline = this.___pipelineMap[type];;
            if (!___pipeline)
            {   
                this.___channelMap[type] = channel;
                ___pipeline  = new JTChannelPipeline(this);
                ___pipeline.bind(channel);
                this.___pipelineMap[type] = ___pipeline;
                this.__size ++;
            }
            return ___pipeline;
        }

        public setupChannel(type:string, __channleClass:any):JTIChannelPipeline
        {
            let ___pipeline:JTIChannelPipeline = this.___pipelineMap[type];;
            if (!___pipeline)
            {   
                let __c:JTIChannel = new __channleClass();
                this.___channelMap[type] = __c;
                ___pipeline  = new JTChannelPipeline(this);
                ___pipeline.bind(__c);
                this.___pipelineMap[type] = ___pipeline;
                this.__size ++;
            }
            return ___pipeline;
        }
        
        public connect():JTIConnection[]
        {
            let count:number = this.__connects.length;
            for (let i:number = 0; i < count; i++) this.__connects[i].connect();
            return this.__connects;
        }
 
        public writeAndFlush(data: any): void 
        {
            let count:number = this.__connects.length;
            for (let i:number = 0; i < count; i++) this.__connects[i].writeAndFlush(data);
        }

        public reload():void 
        {
            let count:number = this.__connects.length;
            for (let i:number = 0; i < count; i++) this.__connects[i].flush();
        }

        public flush():void 
        {
            let count:number = this.__connects.length;
            for (let i:number = 0; i < count; i++) this.__connects[i].flush();
        }

        public send(data:any):void 
        {
            let count:number = this.__connects.length;
            for (let i:number = 0; i < count; i++) this.__connects[i].send(data);
        }

        public mark(channel:JTIConnection):void
        {
            this.__connects.push(channel);
        }

        public getChannelPipeline(type:string):JTIChannelPipeline
        {
            return this.___pipelineMap[type];
        }

        public getChannel(type:string):JTIChannel
        {
            return this.___channelMap[type];
        }

        public get size():number
        {
            return this.__size;
        }
    }

}
