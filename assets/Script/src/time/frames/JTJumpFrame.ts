namespace com 
{
    /***
     * 跳帧-又称帧同步
     * 不管系统是否出现延迟，使用JTSyncFrame都将算出最新动画帧数索引
        let gotoFrame:c.JTGotoFrame = c.JTGotoFrame.create();
        gotoFrame.addEventListener(c.JTTimeEvent.ENTER_FRAME, this.onEnterFrameHandler, this);
        gotoFrame.addEventListener(c.JTTimeEvent.SYNC_FRAME, this.onSyncFrame, this);
        gotoFrame.addEventListener(c.JTTimeEvent.ENTER_LAST_FRAME, this.onEnterFrameHandler, this);
        gotoFrame.addEventListener(c.JTTimeEvent.ENTER_COMPLETE, this.onEnterFrameHandler, this);
        gotoFrame.play(10, 10, 0);
   }

   protected onSyncFrame(gotoFrame:c.JTGotoFrame): void
   {
       c.JTLogger.info("jumpFrame for : " + enterFrame.jumpFrame);
   }
    

    protected onEnterFrameHandler(gotoFrame:c.JTIEnterFrame): void
    {
        c.JTLogger.info("currentFrame for : " + enterFrame.currentFrame);
    }

        
     ***/
    export class JTJumpFrame extends JTEnterFrame implements JTIJumpFrame
    {
        private _jumpFrames:number = 0;
        constructor()
        {
            super();
        }

        /**
         * 获取当前跳了多帧数
         */
        public get jumpFrames():number
        {
             return this._jumpFrames;
        }

        public updateTick(tick:number):void
        {
            this._currentTick += tick; //叠加时间
            let times:number = Math.floor(this._currentTick / this._interval);//取最小延迟次数
            this._jumpFrames = 0;
            if (times > 1) //延迟帧数逻辑处理
            {
                this._jumpFrames = times - 1;
                let nowTimes:number = this._currentTimes + times;
                let delayLoops:number = Math.floor(nowTimes / this._totalTimes);
                this._loopTimes += delayLoops;
                if (this._loop == 0) 
                {
                    this._currentTimes = nowTimes % this._totalTimes;//当循环次数为0是，需要实时计算最后一帧数
                }
                else
                {
                    if (this._loopTimes >= this._loop)
                    {
                        this._loopTimes = this._loop;
                        this._currentTimes = this._totalTimes;//当循环次数为0是，跳转到最后一帧数
                    }
                    else  this._currentTimes = nowTimes % this._totalTimes;//当循环次数为0是，需要实时计算最后一帧数
                }
                this.dispatchEvent(JTTimeEvent.JUMP_FRAME, this);
                this.dispatchEvent(JTTimeEvent.ENTER_FRAME, this);
                delayLoops >= 1 && this.dispatchEvent(JTTimeEvent.ENTER_LAST_FRAME, this);
                if (this._loopTimes >= this._loop && this._loop != 0)
                {
                    this._currentTick = 0;
                    this._running = false;
                    this.dispatchEvent(JTTimeEvent.ENTER_COMPLETE, this);
                }
                else
                {
                    this._currentTick = this._currentTick % this._interval;//重新更新时间节点
                }
            }   
            else if (times == 1) //正常帧数无需跳帧数
            {
                super.updateTick(tick);
                // this._currentTimes ++;
                // this._currentTick -= this._interval;
                // this.dispatchEvent(JTTimeEvent.ENTER_FRAME, this);
                // if (this._currentTimes >= this._totalTimes)
                // {
                //     this._loopTimes ++;
                //     if (this._loop == 0)this._currentTimes = 0;
                //     else
                //     {
                //         if (this._loopTimes >= this._loop && this._loop != 0)
                //         {
                //             this._running = false;
                //             this.dispatchEvent(JTTimeEvent.ENTER_LAST_FRAME, this);
                //             this.dispatchEvent(JTTimeEvent.ENTER_COMPLETE, this);
                //         }
                //         else
                //         {
                //             this._currentTimes = 0;
                //             this.dispatchEvent(JTTimeEvent.ENTER_LAST_FRAME, this);
                //         }
                //     }
                // }
            }
        }
      

        public static create():JTIJumpFrame
        {
            let timer:JTIJumpFrame = JTPool.instance(JTJumpFrame).get() as JTIJumpFrame;
            return timer;
        } 

        public static put(timer:JTIJumpFrame):void
        {
            JTTimerTool.defaultTimer.removeTask(timer as any);
            JTPool.instance(JTJumpFrame).put(timer as JTIJumpFrame);
        }
    }

}
