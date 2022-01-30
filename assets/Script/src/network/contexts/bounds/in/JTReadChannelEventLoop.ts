module com 
{
    export class JTReadChannelEventLoop extends JTChannelEventLoop implements JTIChannelRead
    {

        constructor(timerTask:JTITimer | JTIEnterFrame, keepCount:number = 100)
        {
            super(timerTask, keepCount);
        }

        protected flowMessage(message:any): void 
        {
            for (let i:number = 0; i < this.__context.length; i++)
            {
                let ___c:JTIChannelRead = (this.__context[i] as any) as JTIChannelRead;
                message = ___c.channelRead(message);
            }
        }

        public channelRead(data:any):void
        {
            this._messageQueue.push(data);
        }
    }
}