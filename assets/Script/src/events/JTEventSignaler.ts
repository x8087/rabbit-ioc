namespace com 
{
        /***
         * 事件信号器 --- 基于全局函数派发执行，
         */
        export class JTEventSignaler implements JTIEventSignaler
        {
                private __evtMap:Object = null;
                private __funMap:Object = null;

                recycle() 
                {
                        this.removeEvents();
                        this.removeFunctions();
                }

                //由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
		//提前注入该对象的方法，可能导致指针异常
   

                public addEventListener(key:any, method:Function, caller:any, once?:boolean):void
                {
                        if (!this.evtMap[key])//只有在注册的时候调用get方法，注入事件监听时，事件MAP会为null
                        {
                                this.__evtMap[key] = method;
                                JTEventManager.addEventListener(key, method, caller, once);
                        }       
                }

                public dispatchEvent(key:any, args?:any)
                {
                        key in this.evtMap && JTEventManager.dispatchEvent(key, args);
                }

                public removeEventListener(key:any, method:Function, caller:any):void
                {
                        let fun:Function = this.evtMap[key]
                        fun = null;
                        this.__evtMap[key] = null;
                        delete this.__evtMap[key]
                        JTEventManager.removeEventListener(key, method, caller);
                }

                public removeEvents() 
                {
                        var caller:any = this;
                        for (var key in this.evtMap)
                        {
                                this.removeEventListener(key, this.__evtMap[key], caller)
                        }
                        this.__evtMap = {};
                }

                public registerFunction(key:any, method:Function, caller:any, once?:boolean):void
                {
                        if (!this.funMap[key])//只有在注册的时候调用get方法，注入事件监听时，事件MAP会为null
                        {
                                this.__funMap[key] = method;
                                JTFunctionManager.registerFunction(key, method, caller, once);
                        }       
                }

                public execute(key:any, args?:any):void
                {
                        key in this.funMap && JTFunctionManager.execute(key, args);
                }

                public removeFunction(key:any, method:Function, caller:any):void
                {
                        let fun:Function = this.funMap[key]
                        fun = null;
                        this.__funMap[key] = null;
                        delete this.__funMap[key]
                        JTFunctionManager.removeFunction(key, method, caller);
                }

                public removeFunctions() 
                {
                        var caller:any = this;
                        for (var key in this.funMap)
                        {
                                this.removeFunction(key, this.__funMap[key], caller)
                        }
                        this.__funMap = {};
                }


                public get evtMap():Object
                {
                        if (!this.__evtMap)
                        {
                                this.__evtMap = {};
                        }       
                        return this.__evtMap;
                }

                public get funMap():Object
                {
                        if (!this.__funMap)
                        {
                                this.__funMap = {};
                        }       
                        return this.__funMap;
                }

                public static get pool():JTIPool
                {
                    if(!this._pool)
                    {
                        this._pool = JTPool.instance(JTEventSignaler);
                    }
                    return this._pool;
                }
                
                private static _pool:JTIPool = null;
                public static create():JTEventSignaler
                {
                    var signaler:JTEventSignaler = this.pool.get() as JTEventSignaler;
                    return signaler;
                }
        
                public static put(signaler:JTEventSignaler):void
                {
                    this.pool.put(signaler)
                }
        }

        
}
