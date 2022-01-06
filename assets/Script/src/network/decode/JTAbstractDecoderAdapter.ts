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
               let downProtocol:JTIProtocol = JTSingleManager.instance.protocolManager.downProtocol;
               let errorMessageCls:any = JTApplication.getClass(JTApplication.SHOW_ERROR_MESSAGE);
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
               if (errorMessageCls.checkPackageStatus(receivePackage))
               {
                    JTFunctionManager.execute(protocol.toString(), receivePackage.content);
                    JTLogger.info("[receivePackage.read] DownProtocol: " + protocol,  "    content:  " + JSON.stringify(receivePackage["content"]));
               }
               else
               {

                    errorMessageCls.showErrorMessage(receivePackage);
                    JTLogger.info("[receivePackage.read] protocol: " + protocol,  "    errorCode:  " + receivePackage.errorCode);
               }
        }
    
    }
}
