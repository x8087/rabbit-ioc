module com 
{
    export class JTChannelLoggerAdapter extends JTAbstractLoggerAdapter
    {
        protected _sendLog:boolean = false;
        protected _receiveLog:boolean = false;
        constructor(sendLog:boolean = true, receiveLog:boolean = true)
        {
            super();
            this._sendLog = sendLog;
            this._receiveLog = receiveLog;
        }
        
        public channelRead(data:any):any 
        {
            if (this._receiveLog)
            {
                let message:any = data as JTReceivePackage
                let protocol:any = message.protocol;
                let status:number = message.status;
                if (status == JTProtocol.NORMAL)
                {
                    let content:any = message.content;
                    JTLogger.info("[receivePackage.read] DownProtocol: " + protocol,  "    content:  " + JSON.stringify(content));
                }
                else
                {
                    let errorCode:any = message.errorCode;
                    JTLogger.info("[receivePackage.read] protocol: " + protocol,  "    errorCode:  " + errorCode);
                }
            }
            return data;
        }

        public channelWrite(data:any):any 
        {
            if (this._sendLog)
            {
                let message:any = JSON.parse(data);
                JTLogger.info("[sendPackage.send] : UpProtocol:  " + message.protocol,  "   content: " + JSON.stringify(message.content));
            }
            return data;
        }

        public channelInactive():void 
        {
        }

        public channelActive():void 
        {
        }
    }
}