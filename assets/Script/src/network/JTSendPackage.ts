 
namespace com 
{
    export class JTSendPackage implements JTIPoolObject
    {
        private _content:Object = {};
        private _data:Object = {};
        private _protocol:number = 0;
        private _channel:JTIChannel = null;
        
        public writeProtocol(protocol:number):void
        {
            this._protocol = protocol;
        }

        public write(key:string, value:Object):void
        {
            this._content[key] = value;
        }   

        public get content():Object
        {
            return this._content;
        }

        public get protocol():number
        {
            return this._protocol;
        }

        public send():void
        {
            this._data["protocol"] = this._protocol;
            this._data["content"] = this._content;
            this._channel && this._channel.send(this._data);

            JTSendPackage.put(this);
        }

        public setup(channel:JTIChannel):void
        {
            this._channel = channel;
        }

        public recycle():void
        {
            this._content = {};
            this._channel = null;
            this._protocol = 0;
            this._data = {};
        }

        public static get pool():JTIPool
        {
            if(!this._pool)
            {
                this._pool = JTPool.instance(JTSendPackage);
            }
            return this._pool;
        }
        
        private static _pool:JTIPool = null;

        public static begin(channel?:JTIChannel):JTSendPackage
        {
            var sendPackage:JTSendPackage = this.pool.get() as JTSendPackage;
            if (!channel) channel = JTSession.channel; //如果没有传连接通道，直接使用框架默认的连接
            sendPackage.setup(channel);
            return sendPackage;
        }

        public static put(sendPackage:JTSendPackage):void
        {
            this.pool.put(sendPackage as JTIPoolObject);
        }
    }
}
