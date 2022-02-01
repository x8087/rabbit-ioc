module com 
{
    export abstract class JTGameController extends JTLogicController
    {
        protected _timer:JTITimer = null;
        protected _logicTime:number = 0;

        constructor()
        {
            super();
        }

        public start(): void 
        {
            if (!this._timer)
            {
                this._timer = JTTimer.create(1000, 0);
                this._timer.addEventListener(JTTimeEvent.TIMER, this.countdownUpdate, this);
            }
            this._timer.reset();
            this._timer.start();
            this._currentIndex = 0;
            this._runningLogic = this._logics[this._currentIndex];
        }

        public changeLogic():JTIGameLogic
        {
            this._currentIndex ++;
            if (this._currentIndex == this._taskCount - 1)
            {
                 this.stop();
                 return;
            }
            this._timer.reset();
            this._runningLogic = this._logics[this._currentIndex];
            this._logicTime = (this._runningLogic as JTIGameLogic).logicTime;
        }

        public stop():void
        {
            this._timer.reset();
            this._timer.stop();
        }

        protected countdownUpdate(timer:JTITimer):void
        {
            let currentCount:number = timer.currentCount;
            let countdown:number = this._logicTime - (currentCount - 1);
            if (countdown <= 1)
            {
                this.changed(countdown);
                return;
            }
            this.updateGameTimeUI(countdown);
        }

        protected changed(countdown:number):void
        {
            this.changeLogic();
            this.nodityChangedLogic(countdown, this._runningLogic);
        }

        protected abstract updateGameTimeUI(countdown:number):void;
    
        protected abstract nodityChangedLogic(countdown:number, logic:JTILogic):void;
        
    }
}


