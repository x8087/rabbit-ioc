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
               let protocolManager:JTProtocolItemManager = JTApplication.getObject(JTApplication.PROTOCOL);
               let protocolDown:JTIProtocol = protocolManager.protocolDown;
               let protocolErrorMsg:JTProtocolErrorMsg = JTApplication.getObject(JTApplication.ERROR_MESSAGE);
               let protocol:number = receivePackage.protocol;
               let itemProtocol:JTItemProtocol= protocolDown.getProtocol(protocol);
               if (!itemProtocol)
               {
                    JTLogger.debug("[receivePackage.read] the downProcotol cant register protocol: " + protocol);
               }
               if (itemProtocol && itemProtocol.isWaiting)
               {
                   protocolDown.execute(receivePackage.content);
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
