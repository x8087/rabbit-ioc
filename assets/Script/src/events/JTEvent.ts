module com 
{
    export class JTEvent implements JTIPoolObject
    {
        private _caller:any = null;
        private _method:Function = null;
        private _args:any = null;
        private _once:Boolean = false;

        public recycle() 
        {
            this._caller = this._method = this._args = null;
        }

        public setTo(caller:any, method:Function, args?:any, once:Boolean = false):JTEvent
        {
            this._caller =caller;
            this._method = method;
            this._args = args;
            this._once = once;
            return this;
        }

        /**
        *执行处理器。
        */
        public run():any
        {
            if (this._method == null) return null;
            var result=this._method.apply(this._caller, this._args);
            this._once && this.recover();
            return result;
        }

            /**
            *执行处理器，携带额外数据。
            *@param data 附加的回调数据，可以是单数据或者Array(作为多参)。
            */
        public runWith(data):any
        {
            if (this._method == null)return null;
            if (data == null)
                var result = this._method.apply(this._caller, this._args);
            else if (!this._args && !data.unshift)result = this._method.call(this._caller, data);
            else if (this._args)result = this._method.apply(this._caller, this._args.concat(data));
            else result = this._method.apply(this._caller, data instanceof Array ? [data] : data); //调用apply时，不管参数是否为数组，方法自动会认为参数为数组，所以传入数组时，一定要判断
            this._once && this.recover();
            return result;
        }

        /**
        *清理对象引用。
        */
        public clear():JTEvent
        {
            this._method = this._args = this._caller = null;
            return this;
        }

        /**
        *清理并回收到 Handler 对象池内。
        */
        public recover()
        {
            this.clear();
        }

        public get caller():any
        {
            return this._caller;
        }

        public get method():Function
        {
            return this._method;
        }

        public get once():Boolean
        {
            return this._once;
        }

        public static get pool():JTIPool
        {
            if(!this._pool)
            {
                this._pool = JTPool.instance(JTEvent);
            }
            return this._pool;
        }
        
        private static _pool:JTIPool = null;
        public static create(caller:any, method:Function, args?:any, once:Boolean = false):JTEvent
        {
            var evt:JTEvent = this.pool.get() as JTEvent;
            evt.setTo(caller, method, args, once);
            return evt;
        }

        public static put(evt:JTEvent):void
        {
            this.pool.put(evt)
        }
    }
}
