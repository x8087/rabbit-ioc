namespace com 
{
    export class JTEventDispatcher implements JTIPoolObject
    {
        protected  _eventMap:Object = {}
        constructor()
        {
        }

        recycle() 
        {
            this.removes();
        }

        public addEventListener(key:any, method:Function, caller:any, once?:boolean):void
        {
            var list:JTCommand[] = this._eventMap[key];
            if (list)
            {
                list.forEach(element => 
                {
                    if (element && element.method == method && element.caller == caller)
                    {
                        JTLogger.info("[JTFunctionManager.registerFunction] The key"+ key +" function already registered ");
                        return ;
                    }
                });
            }
            else
            {
                list = [];
                this._eventMap[key] = list;
            }
            var command:JTCommand = JTCommand.create(caller, method, null, once);
            list.push(command);
        }

        public dispatchEvent(key:any, args?:any):void
        {
            var list:JTCommand[] = this._eventMap[key];
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
            else
            {
                JTLogger.info("[JTFunctionManager.execute] Cant find the function by key : " + key);
            }
        }

        public removeEventListener(key:any, method:Function, caller:any):void
        {
            var list:JTCommand[] = this._eventMap[key];
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
            var list:JTCommand[] = this._eventMap[key];
            if (list)
            {
                list.forEach(element => 
                {
                    if (element)
                    {
                        this.delete(list, element);
                    }
                });
                this._eventMap[key] = null;
                delete this._eventMap[key]
            }
        }

        protected delete(list:JTCommand[], command:JTCommand):void
        {
                var index:number = list.indexOf(command);
                var removes:JTCommand[] = list.splice(index, 1);
                removes.shift();
                JTCommand.put(command);
        }

        protected removes() 
        {
            // this._eventMap.forEach((value, key)=>{
            //         this.removeEvents(key);
            //         value.length = 0;
            // })
            // this._eventMap.clear();

            // this._eventMap.forEach(element => {
                
            // });
            var caller:any = this;
            for (var key in this._eventMap)
            {
                    this.removeEventListener(key, this._eventMap[key], caller)
            }
            this._eventMap = {};
        }
        
    }
}