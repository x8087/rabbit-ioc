namespace com 
{
    export class JTProtocolItemManager
    {
        public upProtocol:JTIProtocol = null;

        public downProtocol:JTIProtocol = null;

        constructor()
        {
            this.build();
        }

        protected build():void
        {
            
        }

        public registerClassAlias(upClass:any, downCls:any):void
        {
                this.upProtocol = new upClass();
                this.downProtocol = new downCls();
        }
        
    }
}
