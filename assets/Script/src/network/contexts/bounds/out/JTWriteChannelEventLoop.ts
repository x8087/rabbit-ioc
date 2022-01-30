///<reference path="../JTChannelEventLoop.ts"/>
module com 
{
    export class JTWriteChannelEventLoop extends JTChannelEventLoop implements JTIChannelWrite
    {
        constructor(timerTask:JTITimer | JTIEnterFrame, keepCount:number = 100)
        {
            super(timerTask, keepCount);
        }

        protected flowMessage(message:any): void 
        {
            for (let i:number = 0; i < this.__context.length; i++)
            {
                let ___c:JTIChannelWrite = (this.__context[i] as any) as JTIChannelWrite;
                message = ___c.channelWrite(message);
            }
            this._channel.send(message);
        }

        public channelWrite(data:any):void
        {
            this.showWaitting(data);
            this._messageQueue.push(data);
        }

        public send(data:any): void 
        {
            this.showWaitting(data);
            this._channel.send(data);
        }

        public writeAndFlush(data:any): void 
        {
            this.showWaitting(data);
            this._messageQueue.push(data);
            this._channel.flush();
        }

        protected showWaitting(data:any):void
        {
            let itemProtocol:JTItemProtocol= this._protocolContext.protocolUp.getProtocol(data.protocol);
            if (itemProtocol && itemProtocol.isWaiting)
            {
                this._protocolContext.protocolUp.execute(data);
            }
        }
    }
}