///<reference path="../JTChannelContext.ts"/>
module com 
{
    export abstract class JTAbstractIdleStateAdapter extends JTChannelContext
    {
        protected _timer:JTITimer = null;

        protected _repeatCount:number = 0;

        protected _currentRepeatCount:number = 0;

        protected _heartInterval:number = 0;

        protected _connected:boolean = false;

        protected _protocol:any = null;



        /**
         * 以秒为单位
         * @param interval 
         * @param repeatTimes 
         */
        constructor(interval:number = 15000, repeatInterval:number = 10, repeatTimes:number = 5)
        {
            super();
            this._heartInterval = interval;
        }

        public build(): void 
        {
  
        }

        public channelInactive():void
        {

        }

        public channelActive(): void 
        {
                this._connected = true;
                this.createTimer(this._heartInterval);
        }

        protected createTimer(interval:number):void
        {
            this._timer = JTTimer.create(interval, 0);
            this._timer.addEventListener(JTTimeEvent.TIMER, this.onTimerHandler, this);
        }

        protected onTimerHandler(timer:JTITimer):void
        {
            if (!this._connected) 
            {
                this._timer.stop();
                return;
            }
        }
        
        protected onTimerComplete(timer:JTITimer):void
        {
                // this._channelPipeline.launch();
        }

        public get protocol():any
        {
            return this._protocol;
        }
    }
}
