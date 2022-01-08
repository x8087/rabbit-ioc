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
            let upProtocol:JTIProtocol = JTApplication.getObject(JTApplication.PROTOCOL_MANAGER).upProtocol;
            let protocolItem:JTItemProtocol= upProtocol.getProtocol(message.protocol);
            if (protocolItem.isWaiting)
            {
                upProtocol.execute(message);
            }
            JTLogger.info("[sendPackage.send] : UpProtocol:  " + message.protocol,  "   content: " + JSON.stringify(message.content));
        }
    }
}
