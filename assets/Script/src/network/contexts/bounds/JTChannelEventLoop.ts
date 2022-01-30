module com 
{
    export abstract class JTChannelEventLoop extends JTChannelContext
    {
        protected _keepCount:number = 0;
        protected _timerTask:JTITimer | JTIEnterFrame = null;
        protected __context:JTIChannelContext[] = null;
        protected _contextMap:{[type:string]: JTIChannelContext} = null;

        protected _messageQueue:any[] = null;
        /**
         * 消息处理器
         * @param sender 发送者计时器 
         * @param keepMaxSend 发送者最大阻塞消息数
         * @param receiver 发送者计时器 
         * @param keepMaxReceive 接收者最大阻塞消息数
         */
        constructor(timerTask:JTITimer | JTIEnterFrame, keepCount:number = 100)
        {
            super();
            this.__context = [];
            this._contextMap = {};
            this._timerTask = timerTask;
            this._keepCount = keepCount;
            this._messageQueue = [];

            if (this._timerTask instanceof JTTimer)
            {
                this._timerTask.addEventListener(JTTimeEvent.TIMER, this.onEnterFrame, this);
            }
            else if (this._timerTask instanceof JTEnterFrame)
            {
                this._timerTask.addEventListener(JTTimeEvent.ENTER_FRAME, this.onEnterFrame, this);
            }
        }

        public build(): void 
        {
            if (this._timerTask instanceof JTTimer)
            {
                this._timerTask.start();
            }
            else if (this._timerTask instanceof JTEnterFrame)
            {
                this._timerTask.play();
            }
        }

        protected onEnterFrame(timer:JTITimerTask):void
        {
            if (this._messageQueue.length > this._keepCount)
            {
                let count:number = this._messageQueue.length - this._keepCount;
                this._messageQueue.splice(0, count);//删除前面的消息
            }
            if (this._messageQueue.length == 0) return;
            this.flowMessage(this._messageQueue.shift());
        }

        public channelInactive(): void 
        {
        }
        
        public channelActive(): void 
        {
            
        }

        protected abstract flowMessage(message:any):void;

        /**
         * 
         * @param type 
         * @param ___c 
         * @returns 
         */
        public childOption(type:string, ___c:JTIChannelContext):JTChannelEventLoop
        {
            this._contextMap[type] = ___c;
            this.__context.push(___c);
            this.__context.sort(this.compare);
            return this;
        }

        protected compare(a:JTChannelContext, b:JTChannelContext):number
        {
                return a.sortId - b.sortId ;
        }

        public getContext(type:string):JTIChannelContext
        {
            return this._contextMap[type];
        }

        protected poll():any
        {
            return null;
        }

        public get sortId():number 
        {
            return JTChannelContextSortId.EVENTLOOP;
        }
    }
}