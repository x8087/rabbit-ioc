module com 
{
    export class JTEventDispatcher implements JTIPoolObject, JTIEventDispatcher
    {
        protected  __evtMap:Object = null;
        constructor()
        {
        }

        recycle() 
        {
            this.removes();
        }

        public addEventListener(key:any, method:Function, caller:any, once?:boolean):void
        {
            var list:JTHandler[] = this.evtMap[key];//只有在注册的时候调用get方法，注入事件监听时，事件MAP会为null
            if (list)
            {
                list.forEach(element => 
                {
                    if (element && element.method == method && element.caller == caller)
                    {
                        // JTLogger.info("[JTFunctionManager.registerFunction] The key"+ key +" function already registered ");
                        return ;
                    }
                });
            }
            else
            {
                list = [];
                this.__evtMap[key] = list;
            }
            var command:JTHandler = JTHandler.create(caller, method, null, once);
            list.push(command);
        }

        public dispatch(key:any, args?:any):any
        {
            var list:JTHandler[] = this.evtMap[key];
            if (list)
            {
                list.forEach(command => 
                {
                    command && command.runWith(args)
                    if (command.once)
                    {
                        this.delete(list, command);
                    }
                });
            }
        }

        public removeEventListener(key:any, method:Function, caller:any):void
        {
            var list:JTHandler[] = this.evtMap[key];
            if (list)
            {
                list.forEach(element => 
                {
                    if (element && element.method == method && element.caller == caller)
                    {
                        this.delete(list, element);
                    }
                });
                
            }
        }

        public removeEvents(key:any):void
        {
            var list:JTHandler[] = this.evtMap[key];
            if (list)
            {
                list.forEach(element => 
                {
                    if (element)
                    {
                        this.delete(list, element);
                    }
                });
                this.__evtMap[key] = null;
                delete this.__evtMap[key]
            }
        }

        protected delete(list:JTHandler[], command:JTHandler):void
        {
                var index:number = list.indexOf(command);
                var removes:JTHandler[] = list.splice(index, 1);
                removes.shift();
                JTHandler.put(command);
        }

        public removes():void 
        {
            // this._eventMap.forEach((value, key)=>{
            //         this.removeEvents(key);
            //         value.length = 0;
            // })
            // this._eventMap.clear();

            // this._eventMap.forEach(element => {
                
            // });
            for (var key in this.evtMap)
            {
                    this.removeEvents(key);
            }
            this.__evtMap = {};
        }

        public get evtMap():Object
        {
            if (!this.__evtMap)
            {
                this.__evtMap = {};
            }
            return this.__evtMap;
        }
        
    }
}