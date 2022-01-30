///<reference path="../JTChannelContextAdapter.ts"/>
module com 
{
    export abstract class JTAbstractDecoderAdapter extends JTChannelContextAdapter implements JTIDecoderAdapter
    {
        protected _responseMapper:JTAbstractResponseMapping = null;
        protected _protocolContext:JTAbstractProtocolManager = null;
        protected _errorMessageContext:JTAbstractProtocolErrorMessage = null;
        protected _downProtocol:JTIProtocol = null;
        constructor()
        {
            super();
            
        }

        public channelRead(message:any):any
        {
            let data:any = this.decode(message);
            this.readComplete(data);
            return data;
        }

        public channelActive():void
        {
            this._responseMapper = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_MAPPING)
            this._protocolContext = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_PROTOCOL);
            this._errorMessageContext = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_ERROR_MESSAGE);
            this._downProtocol = this._protocolContext.downProtocol;
        }

        public abstract decode(data:any):any;

        public readComplete(receivePackage:JTIReceivePackage):void
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
                JTFunctionManager.execute(protocol.toString(), content);
                JTLogger.info("[receivePackage.read] DownProtocol: " + protocol,  "    content:  " + JSON.stringify(content));
            }
            else
            {
                this._errorMessageContext.showErrorMessage(receivePackage);
                JTLogger.info("[receivePackage.read] protocol: " + protocol,  "    errorCode:  " + receivePackage.errorCode);
            }
        }

        public channelInactive(): void
        {

        }

        protected toMapper(protocol:number, data:any):any
        {
            return this._responseMapper.create(protocol, data);
        }
    
    }
}
