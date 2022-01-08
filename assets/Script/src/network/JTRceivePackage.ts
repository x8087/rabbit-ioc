 
namespace com 
{
    export class JTReceivePackage implements JTIReceivePackage
    {
        private _content:Object = null;
        private _data:Object = null;
        private _protocol:number = 0;
        
        private _status:number = 0;
        private _errorCode:number = 0;



        public get content():Object
        {
            return this._content;
        }

        public get protocol():number
        {
            return this._protocol;
        }

        public get status():number
        {
            return this._status;
        }

        public get errorCode():number
        {
            return this._errorCode;
        }

        public readPackage(data:any):void
        {
            this._data = JSON.parse(data);
            this._status = this._data["status"];
            this._protocol = this._data["protocol"];
            if (this._status == JTProtocol.NORMAL)
            {
                this._content = this._data["content"];
            }
            else
            {
                this._errorCode = this._data["errorCode"];
            }
        }

        public recycle():void
        {
            this._content = null;
            this._protocol = this._errorCode = this._status = 0;
            this._data = null;
        }

        public static initialize():void
        {
            if(!this._pool)this._pool = this._pool = JTPool.instance(JTReceivePackage)
        }

        private static _pool:JTIPool = null;

        public static read(data:any):JTReceivePackage
        {
            var receivePackage:JTReceivePackage = this._pool.get() as JTReceivePackage;
            receivePackage.readPackage(data)
            return receivePackage;
        }

        public static put(receivePackage:JTReceivePackage):void
        {
            this._pool.put(receivePackage as JTIPoolObject);
        }
    }
}
