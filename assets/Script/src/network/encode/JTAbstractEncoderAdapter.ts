namespace com 
{
    export abstract class JTAbstractEncoderAdapter extends JTChannelAdapter implements JTIEncoderAdapter
    {
        constructor()
        {
            super();
        }

        public abstract encode(data:any):any;

        public writeComplete(data:any):void
        {
            let message:any = JSON.parse(data);
            let protocolManager:JTProtocolItemManager = JTApplication.getExtensionItem(JTApplication.PROTOCOL);
            let protocolUp:JTIProtocol = protocolManager.protocolUp;
            let itemProtocol:JTItemProtocol= protocolUp.getProtocol(message.protocol);
            if (itemProtocol && itemProtocol.isWaiting)
            {
                protocolUp.execute(message);
            }
            JTLogger.info("[sendPackage.send] : UpProtocol:  " + message.protocol,  "   content: " + JSON.stringify(message.content));
        }
    }
}
