namespace com 
{
    export class JTApplication
    {
            private static _clsMap:Object = {};

            public static  PROTOCOL_MANAGER:string = "PROTOCOL_MANAGER";
            public static  SHOW_ERROR_MESSAGE:string = "SHOW_ERROR_MESSAGE_CLS";

            private static defaultRegisterClassAlias():void
            {
                    this.registerClassAlias(this.PROTOCOL_MANAGER, JTProtocolItemManager);
                    this.registerClassAlias(this.SHOW_ERROR_MESSAGE, JTProtocolErrorMsg)
            }

            public static registerClassAlias(key:string, cls:any):void
            {
                this._clsMap[key] = cls;
            }


            public static init():void
            {
                if (this._clsMap[this.PROTOCOL_MANAGER] == null) this.defaultRegisterClassAlias();
                JTCommand.initialize();
                JTSendPackage.initialize();
                JTReceivePackage.initialize();
                JTSingleManager.initialize();
                
            }

            public static getClass(clsName:string):any
            {
                    return this._clsMap[clsName];
            }

            // public static setupProtocolManager(cls:any):void
            // {
            //     JTProtocolManager.initialize();
            // }
    }
}
