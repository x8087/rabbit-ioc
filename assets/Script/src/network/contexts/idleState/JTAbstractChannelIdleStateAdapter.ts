///<reference path="../JTChannelContext.ts"/>
module com 
{
    export abstract class JTAbstractChannelIdleStateAdapter extends JTChannelContext implements JTIChannelIdleStateAdapter
    {
        protected _heartTimer:JTITimer = null;

        protected _heartInterval:number = 0;

        protected _connected:boolean = false;

        protected _protocol:string | number = null;

        /**
         * 以秒为单位
         * @param interval 
         * @param repeatTimes 
         */
        constructor(protocol:string | number, interval:number = 15000)
        {
            super();
            this._protocol = protocol;
            this._heartInterval = interval;
            this._heartTimer = this.createTimer(this._heartInterval, this.onTimerHandler);
        }

        public build(): void 
        {
  
        }

        public channelInactive():void
        {
            this._connected = false;
            this._heartTimer.start();
        }

        public channelActive(): void 
        {
            this._connected = true;
            this._heartTimer.stop();
        }

        protected createTimer(interval:number, handler:Function, loop:number = 0):JTITimer
        {
            let timer:JTITimer = JTTimer.create(interval, loop);
            timer.addEventListener(JTTimeEvent.TIMER, handler, this);
            return timer;
        }

        protected onTimerHandler(timer:JTITimer):void
        {
            if (!this._connected) 
            {
                this._heartTimer.stop();
                return;
            }
            this.sendHeartPackage();
        }

        protected abstract sendHeartPackage():void;
        
        public get protocol():number | string
        {
            return this._protocol;
        }

        public get connected():boolean
        {
            return this._connected;
        }
    }
}
