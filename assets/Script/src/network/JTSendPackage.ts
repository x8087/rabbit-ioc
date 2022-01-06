 
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

        public static initialize():void
        {
            if(!this._pool)this._pool = this._pool = JTPool.instance(JTSendPackage)
        }

        private static _pool:JTIPool = null;

        public static begin():JTSendPackage
        {
            var sendPackage:JTSendPackage = this._pool.get() as JTSendPackage;
            sendPackage.setup(JTSession.socketChannel);
            return sendPackage;
        }

        public static put(sendPackage:JTSendPackage):void
        {
            this._pool.put(sendPackage as JTIPoolObject);
        }
    }
}
