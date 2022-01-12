namespace com 
{
    export abstract class JTProtocolItemManager extends JTApplicationContext
    {
        public protocolUp:JTIProtocol = null;

        public downProtocol:JTIProtocol = null;

        constructor()
        {
            super();
        }

        public build():void
        {
            
        }

        /**
         * 注册下行协议
         * @param protocol 协议号
         * @param waiting 是否显示转圈
         * @param security 加密方式
         */
        public registerDownProtocol(protocol:number, waiting:boolean, security?:string):void
        {
                this.downProtocol.registerProtocol(protocol, waiting, security)
        }

        
        /**
         * 注册上行协议
         * @param protocol 协议号
         * @param waiting 是否显示转圈
         * @param security 解密方式
         */
         public registerUpProtocol(protocol:number, waiting:boolean, security?:string):void
         {
            this.protocolUp.registerProtocol(protocol, waiting, security);
         }

        public bind(classUp:any, classDown:any):void
        {
                this.protocolUp = new classUp();
                this.downProtocol = new classDown();
        }
        
    }
}
