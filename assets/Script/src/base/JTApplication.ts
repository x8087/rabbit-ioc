namespace com 
{
    export abstract class JTApplication
    {
        protected static extensionMap:{[name:string]:any} = {};

        public static PROTOCOL_MANAGER:string = "PROTOCOL_MANAGER";
        public static SHOW_ERROR_MESSAGE:string = "SHOW_ERROR_MESSAGE";
        public static TEMPLATE_MANAGER:string = "TEMPLATE_MANAGER";

        public static WEBSOCKET_CHANNEL:string = "WEBSOCKET_CHANNEL";

        public static HTTP_CHANNEL:string = "HTTP_CHANNEL";

        public static WEBSOCKET_PIPELINE:string = "WEBSOCKET_PIPELINE";

        constructor()
        {
            this.registerExtensionClassAlias();
        }

        protected registerExtensionClassAlias():void
        {
            this.registerClassAlias(JTApplication.PROTOCOL_MANAGER, new JTProtocolItemManager());
            this.registerClassAlias(JTApplication.SHOW_ERROR_MESSAGE, new JTProtocolErrorMsg());
            this.registerClassAlias(JTApplication.TEMPLATE_MANAGER, JTTemplateBaseManager);
        }

        public registerClassAlias(key:string, runClass:any):void
        {
            JTApplication.extensionMap[key] = runClass
        }

        public static launch():void
        {
     
        }

        public getClass(key:string):any
        {
            return JTApplication.extensionMap[key];
        }

        public static getObject(key:string):any
        {
            return this.extensionMap[key];
        }

        /**
         * 此方法需要重写
         */
        public static get instance():JTApplication
        {
            return null;
        }
    }
}
