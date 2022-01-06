namespace com 
{
    export class JTDecoderToJSONAdapter extends JTAbstractDecoderAdapter
    {
        constructor()
        {
            super();
        }

        public decode(receiveMessage:any):any
        {
            // let data:any = JSON.parse(receiveMessage);
            // let protocol:number = data["protocol"];
            // JTFunctionManager.execute(protocol.toString(), data["content"]);
            // JTLogger.info("[ReceiveMessage] protocol: " + protocol,  "    content:  " + JSON.stringify(data["content"]));
            return  JTJSONPackage.read(receiveMessage);
        }

        public readComplete(receivePackage:JTIReceivePackage):void
        {
            super.readComplete(receivePackage);
        }
    }
}
