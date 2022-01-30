module com 
{
    export abstract class JTAbstractEncoderAdapter extends JTChannelContextAdapter implements JTIEncoderAdapter
    {
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

        public channelActive():void
        {
        
        }

        public abstract encode(data:any):any;

        public writeComplete(data:any):void
        {
            // let message:any = JSON.parse(data);
            // let itemProtocol:JTItemProtocol= this._protocolContext.protocolUp.getProtocol(message.protocol);
            // if (itemProtocol && itemProtocol.isWaiting)
            // {
            //     this._protocolContext.protocolUp.execute(message);
            // }
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
