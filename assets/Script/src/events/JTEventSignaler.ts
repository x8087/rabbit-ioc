namespace com 
{
        /***
         * 事件信号器 --- 基于全局函数派发执行，
         */
        export class JTEventSignaler
        {
                private _eventMap:Object = {};
                private _functionMap:Object = {};
                constructor()
                {
                }

                recycle() 
                {
                        this.removeEvents();
                        this.removeFunctions();
                }

                public addEventListener(key:any, method:Function, caller:any, once?:boolean):void
                {
                        let flag:Boolean = key in this._eventMap;
                        if (!flag)
                        {
                                this._eventMap[key] = method;
                                JTEventManager.addEventListener(key, method, caller, once);
                        }       
                }

                public dispatchEvent(key:any, args?:any):void
                {
                        key in this._eventMap && JTEventManager.dispatchEvent(key, args);
                }

                public removeEventListener(key:any, method:Function, caller:any):void
                {
                        let fun:Function = this._eventMap[key]
                        fun = null;
                        this._eventMap[key] = null;
                        delete this._eventMap[key]
                        JTEventManager.removeEventListener(key, method, caller);
                }

                protected removeEvents() 
                {
                        var caller:any = this;
                        for (var key in this._eventMap)
                        {
                                this.removeFunction(key, this._eventMap[key], caller)
                        }
                        this._eventMap = {};
                }

                public registerFunction(key:any, method:Function, caller:any, once?:boolean):void
                {
                        let flag:Boolean = key in this._functionMap;
                        if (!flag)
                        {
                                this._functionMap[key] = method;
                                JTFunctionManager.registerFunction(key, method, caller, once);
                        }       
                }

                public execute(key:any, args?:any):void
                {
                        key in this._functionMap && JTFunctionManager.execute(key, args);
                }

                public removeFunction(key:any, method:Function, caller:any):void
                {
                        let fun:Function = this._functionMap[key]
                        fun = null;
                        this._functionMap[key] = null;
                        delete this._functionMap[key]
                        JTFunctionManager.removeFunction(key, method, caller);
                }

                protected removeFunctions() 
                {
                        var caller:any = this;
                        for (var key in this._functionMap)
                        {
                                this.removeFunction(key, this._functionMap[key], caller)
                        }
                        this._functionMap = {};
                }
        }
}
