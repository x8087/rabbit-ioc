///<reference path="../JTChannelContext.ts"/>
module com 
{
    export class JTChannelIdleStateAdapter extends JTAbstractChannelIdleStateAdapter
    {
        protected _repeatInterval:number = 0;

        protected _countdownTimes:number = 0;

        protected _repeatTotalTimes:number = 0;

        protected _currentRepeatTimes:number = 0;

        protected _connectTimer:JTITimer = null;

        /**
         * 
         * @param protocol 心跳协议号
         * @param heartInterval 每次发送心跳的间隔时间
         * @param repeatInterval 断线重连间隔时间
         * @param repeatTotalTimes 重连的次数
         */
        constructor(protocol:string | number, heartInterval:number = 15000, repeatInterval:number = 10000, repeatTotalTimes:number = 5)
        {
            super(protocol, heartInterval);
            this._repeatInterval = repeatInterval;
            this._repeatTotalTimes = (repeatTotalTimes + 1);//因为重连次数是从1开始计算的,所以总次数要+1
            this._countdownTimes = repeatInterval / 1000;
            this._connectTimer = this.createTimer(1000, this.onRepeatConnectTimer, this._countdownTimes);
            this._connectTimer.addEventListener(JTTimeEvent.TIMER_COMPLETE, this.onRepeatConnectComplete, this);
        }

        public channelInactive():void
        {
            super.channelInactive();
            this._currentRepeatTimes ++;
            if (this._currentRepeatTimes < this._repeatTotalTimes)
            {
                this.stopConnect();
                this._connectTimer.start();
            }
            else
            {
                this.failConnect();
            }
        }

        public channelActive():void 
        {
            super.channelActive();
            this.succeedConnect();
        }

        protected stopConnect():void
        {
            this._connectTimer.reset();
            this._connectTimer.stop();
        }


        protected onRepeatConnectComplete(timer:JTITimer):void
        {

            this._channelPipeline.connect();
        }

        protected failConnect():void
        {
            this._currentRepeatTimes = 0;
            this.stopConnect();
            JTLogger.info("later try it!")
        }

        protected succeedConnect():void
        {
            this._currentRepeatTimes = 0;
            this.stopConnect();
        }

        protected onRepeatConnectTimer(timer:JTITimer):void
        {
            let countdown:number = timer.totalCount - (timer.currentCount - 1);//倒计时是从最大时间开始的，所以倒计时要加1
            JTLogger.info("current repeat connect countdown : " + countdown, "     repeat connect times:  " + this._currentRepeatTimes);
        }

        protected sendHeartPackage():void 
        {
             
        }
    }
}
