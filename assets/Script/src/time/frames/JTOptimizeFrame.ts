namespace com 
{
    export class JTOptimizeFrame extends JTEnterFrame
    {
        private MAX_DELAY_TIME:number = 500;
        constructor()
        {
            super();
        }

        public updateTick(tick:number):void 
        {
            this._currentTick += tick;
            if (tick >= this.MAX_DELAY_TIME)
            {
                this.adjustFrameRate(JTTimerTool.SLOWY_FRAME_RATE);
            }
        }

        private adjustFrameRate(frameRate:number):void
        {
            this._frameRate = frameRate
            this._interval = 1000 / this._frameRate;

        }
    }
}
