namespace com 
{
    export abstract class JTAbstractDecoderAdapter extends JTChannelAdapter implements JTIDecoderAdapter
    {
        protected _responseMapper:JTResponseMapping = null;
        protected _protocolManager:JTProtocolItemManager = null;
        protected _protocolErrorMessage:JTProtocolErrorMsg = null;
        protected _downProtocol:JTIProtocol = null;
        constructor()
        {
            super();
            
        }

        public channelActive():void
        {
            this._responseMapper = JTApplication.getExtensionItem(JTApplication.MAPPING)
            this._protocolManager = JTApplication.getExtensionItem(JTApplication.PROTOCOL);
            this._protocolErrorMessage = JTApplication.getExtensionItem(JTApplication.ERROR_MESSAGE);
            this._downProtocol = this._protocolManager.downProtocol;
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
               if (this._protocolErrorMessage.checkPackageStatus(receivePackage))
               {
                   if (this._responseMapper) content = this.toMapper(protocol, content); //检查协议号是否绑定了Mapper映射序列化
                    JTFunctionManager.execute(protocol.toString(), content);
                    JTLogger.info("[receivePackage.read] DownProtocol: " + protocol,  "    content:  " + JSON.stringify(content));
               }
               else
               {
                    this._protocolErrorMessage.showErrorMessage(receivePackage);
                    JTLogger.info("[receivePackage.read] protocol: " + protocol,  "    errorCode:  " + receivePackage.errorCode);
               }
        }

        protected toMapper(protocol:number, data:any):JTIMapper
        {
               return this._responseMapper.create(protocol, data)
        }
    
    }
}
