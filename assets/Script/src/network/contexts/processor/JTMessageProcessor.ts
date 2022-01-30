module com 
{
    export abstract class JTMessageProcessor extends JTChannelContext
    {
        protected _sender:JTITimerTask = null;
        protected _receiver:JTITimerTask = null;
        protected _sendMaxCount:number = 0;
        protected _receiveMaxCount:number = 0;
        protected __messageMap:{[type:string]:any[]} = null;
        /**
         * 消息处理器
         * @param sender 发送者计时器 
         * @param keepMaxSend 发送者最大阻塞消息数
         * @param receiver 发送者计时器 
         * @param keepMaxReceive 接收者最大阻塞消息数
         */
        constructor(sender:JTITimerTask, keepMaxSend:number = 100, receiver:JTITimerTask, keepMaxReceive:number = 200)
        {
            super();
            this.__messageMap = {};
            this._receiver = receiver;
            this._sender = sender;
            this._receiveMaxCount = keepMaxReceive;
            this._sendMaxCount = keepMaxSend;
        }

        protected poll():any
        {
            // if (this.__messageMap.length > 0) return this.__messageMap.shift();
            return null;
        }
    }
}