namespace com 
{
    export abstract class JTAbstractDecoderAdapter extends JTChannelAdapter implements JTIDecoderAdapter
    {
        constructor()
        {
            super();
        }

        public channelActive():void
        {
        }

        public abstract decode(data:any):any;

        public readComplete(receivePackage:JTIReceivePackage):void
        {
               let downProtocol:JTIProtocol = JTApplication.getObject(JTApplication.PROTOCOL_MANAGER).downProtocol;
               let protocolErrorMsg:JTProtocolErrorMsg = JTApplication.getObject(JTApplication.SHOW_ERROR_MESSAGE);
               let protocol:number = receivePackage["protocol"];
               let protocolItem:JTItemProtocol= downProtocol.getProtocol(protocol);
               if (!protocolItem)
               {
                    JTLogger.debug("[receivePackage.read] the downProcotol cant register protocol: " + protocol);
               }
               if (protocolItem && protocolItem.isWaiting)
               {
                   downProtocol.execute(receivePackage.content);
               }
               if (protocolErrorMsg.checkPackageStatus(receivePackage))
               {
                    JTFunctionManager.execute(protocol.toString(), receivePackage.content);
                    JTLogger.info("[receivePackage.read] DownProtocol: " + protocol,  "    content:  " + JSON.stringify(receivePackage["content"]));
               }
               else
               {

                    protocolErrorMsg.showErrorMessage(receivePackage);
                    JTLogger.info("[receivePackage.read] protocol: " + protocol,  "    errorCode:  " + receivePackage.errorCode);
               }
        }
    
    }
}
