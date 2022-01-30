
module com 
{
    export abstract class JTSimpleInboundHandler extends JTChannelContext implements JTIChannelRead
    {
        public channelActive(): void {
      
        }

        protected _downProtocol:JTIProtocol = null;

        public channelInactive():void 
        {
        }

        public build():void
        {
            super.build();
            this._downProtocol = this._protocolContext.downProtocol;
        }

        public channelRead(receivePackage:JTReceivePackage):JTReceivePackage 
        {
            let protocol:number = receivePackage.protocol;
            let content:any = receivePackage.content;
            let itemProtocol:JTItemProtocol= this._downProtocol.getProtocol(protocol);
            if (!itemProtocol)
            {
                JTLogger.debug("[receivePackage.read] the downProcotol cant register protocol: " + protocol);
            }
            if (itemProtocol && itemProtocol.isWaiting)
            {
                this._downProtocol.execute(content);
            }
            if (this._errorMessageContext.checkPackageStatus(receivePackage))
            {
                if (this._responseMapper) content = this.toMapper(protocol, content); //检查协议号是否绑定了Mapper映射序列化
                this.readMessageComplete(protocol, content);
            }
            else
            {
                this._errorMessageContext.showErrorMessage(receivePackage);
            }
            return receivePackage
        }

        protected abstract readMessageComplete(protocol:number, content:string):void

        protected toMapper(protocol:number, data:any):any
        {
            return this._responseMapper.create(protocol, data);
        }

        public get sortId():number 
        {
            return JTChannelContextSortId.HANNDLER;
        }

    }
}