module com 
{
    export class JTFunctionManager
    {
        private static _eventMap:Object = {};
        public static registerFunction(key:number | string, method:Function, caller:any, once?:boolean):void
        {
            var list:JTHandler[] = this._eventMap[key]
            if (list)
            {
                list.forEach(element => 
                {
                    if (element && element.method == method && element.caller == caller)
                    {
                        JTLogger.info("[JTFunctionManager.registerFunction] The key    "+ key +"    function already registered ");
                        return ;
                    }
                });
            }
            else
            {
                list = [];
                this._eventMap[key] = list;
            }
            var command:JTHandler = JTHandler.create(caller, method, null, once);
            list.push(command);
        }

        public static addCommand(key:number | string, command:JTHandler):void
        {
            var list:JTHandler[] = this._eventMap[key]
            if (list)
            {
                list.forEach(element => 
                {
                    if (element && element.method == command.method && element.caller == command.caller)
                    {
                        JTLogger.info("[JTFunctionManager.registerFunction] The key    "+ key +"    function already registered ");
                        return ;
                    }
                });
            }
            else
            {
                list = [];
                this._eventMap[key] = list;
            }
            list.push(command);
        }

        public static execute(key:number | string, args?:any):void
        {
            var list:JTHandler[] = this._eventMap[key]
            if (list)
            {
                list.forEach(command => 
                {
                    command && command.runWith(args)
                    if (command.once)
                    {
                        this.delete(list, command);
                    }
                    // if (command.once) 
                });
            }
            else
            {
                JTLogger.info("[JTFunctionManager.execute] Cant find the function by key : " + key);
            }
        }

        public static removeFunction(key:number | string, method:Function, caller:any):void
        {
            var list:JTHandler[] =  this._eventMap[key]
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

        public static removeFunctions(key:number | string):void
        {
            var list:JTHandler[] =  this._eventMap[key]
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
                delete this._eventMap[key];
            }
        }

        private static delete(list:JTHandler[], command:JTHandler):void
        {
                var index:number = list.indexOf(command);
                var removes:JTHandler[] = list.splice(index, 1);
                removes.shift();
                JTHandler.put(command);

        }
    }
}