module com 
{
    export abstract class JTAbstractEncoderAdapter extends JTChannelContextAdapter implements JTIEncoderAdapter
    {
        protected _responseMapper:JTAbstractResponseMapping = null;
        protected _protocolContext:JTAbstractProtocolManager = null;
        protected _errorMessageContext:JTAbstractProtocolErrorMessage = null;
        protected _upProtocol:JTIProtocol = null;
        constructor()
        {
            super();
        }
        
        public channelWrite(message:any):any
        {
            let data:any = this.encode(message);
            this.writeComplete(data);
            return data;
        }

        public build(): void 
        {
            this._responseMapper = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_MAPPING)
            this._protocolContext = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_PROTOCOL);
            this._errorMessageContext = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_ERROR_MESSAGE);
            this._upProtocol = this._protocolContext.protocolUp;
        }

        public channelActive():void
        {
        
        }

        public abstract encode(data:any):any;

        public writeComplete(data:any):void
        {
            let message:any = JSON.parse(data);
            let itemProtocol:JTItemProtocol= this._upProtocol.getProtocol(message.protocol);
            if (itemProtocol && itemProtocol.isWaiting)
            {
                this._upProtocol.execute(message);
            }
            JTLogger.info("[sendPackage.send] : UpProtocol:  " + message.protocol,  "   content: " + JSON.stringify(message.content));
        }

        public channelInactive(): void
        {

        } 
        
        public get sortId():number
        {
            return JTChannelContextSortId.ENCODE;
        }
            
    }
}
