///<reference path="../pools/JTPool.ts"/>
module com 
{
    /**
     * 信号--通信中发送请求到收到响应或者未响应
     */
    export class JTSignal implements JTIPoolObject
    {
        protected _caller:any = null;
        protected _succeed:Function = null;
        protected _fail:Function = null;
        protected _promise:Promise<any> = null;

        public setup(caller:any, promise:Promise<any>, succeed:Function, fail:Function):void
        {
            this._caller = caller;
            this._promise = promise;
            this._succeed = succeed;
            this._fail = fail;
        }

        public get promise():Promise<any>
        {
            return this._promise;
        }

        public release():void
        {
            this._succeed.apply(this._caller, [this._caller]);
            JTSignal.put(this);
        }

        public kill():void
        {
            this._fail.apply(this._caller, [this._caller]);
            JTSignal.put(this);
        }

        public recycle():void
        {
            this._caller = this._promise = this._succeed = this._fail = null;
        }

        private static _pool:JTIPool = JTPool.instance(JTSignal);
        public static create():JTSignal
        {
            let signal:JTSignal = this._pool.get() as JTSignal;
            return signal;
        }

        public static put(signal:JTSignal):void
        {
            this._pool.put(signal);
        }
    }
}