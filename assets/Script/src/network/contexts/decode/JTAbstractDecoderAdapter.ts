///<reference path="../JTChannelContextAdapter.ts"/>
module com 
{
    export abstract class JTAbstractDecoderAdapter extends JTChannelContextAdapter implements JTIDecoderAdapter
    {

        constructor()
        {
            super();
            
        }

        public channelRead(message:any):any
        {
            let data:any = this.decode(message);
            this.readComplete(data);
            return data;
        }


        public channelActive():void
        {

        }

        public abstract decode(data:any):any;

        public readComplete(receivePackage:JTIReceivePackage):void
        {

        }

        public channelInactive(): void
        {

        }

        protected toMapper(protocol:number, data:any):any
        {
            return this._responseMapper.create(protocol, data);
        }

        public get sortId():number
        {
            return JTChannelContextSortId.DECODE;
        }
    
    }
}
