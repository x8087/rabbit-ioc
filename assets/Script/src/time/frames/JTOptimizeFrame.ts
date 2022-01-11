/**
 * 根据系统时间延迟情况自动调整帧频并做跳帧数处理，保持最新的一帧数，大大降低了CPU的负荷...
 */
namespace com 
{
    export class JTOptimizeFrame extends JTJumpFrame
    {
        constructor()
        {
            super();
        }

        public setup(totalFrames:number, loop:number = 0, frameRate:number = 60):void
        {
              super.setup(totalFrames, loop);//使用60帧数
        }

        public play(totalFrames:number, loop:number = 0, frameRate:number = 60):void
        {
            super.play(totalFrames, loop)//使用60帧数
        }

        public updateTick(tick:number):void 
        {
            this._currentTick += tick;
            this.adjustFrameRate(this._currentTick);
            super.updateTick(tick);
        }

        protected adjustFrameRate(value:number):void
        {
            let delayFrames:number = Math.floor(this._currentTick / this.DEFAULT_FRAME_RATE_TIME);
            let val:number = this.sqr(delayFrames, 2);
            this._frameRate = this.DEFAULT_FRAME_RATE - (val * 10);
            this._frameRate = this._frameRate < 1 ? 1 : this._frameRate;
            super.adjustFrameRate(this._frameRate);
            // switch(true)
            // {
            //     case tick <= 64 : //最高延迟4帧----60帧频的情况下4帧约是64毫秒(1000 / 60) = 16, 16 * 4 = 64(毫秒)
            //     {
            //         this._frameRate = 60
            //         break;
            //     }
            //     case tick <= 128 ://最高延迟8帧----60帧频的情况下8帧约是128毫秒，以50帧频运行
            //     {
            //         this._frameRate = 50
            //         break;
            //     }
            //     case tick <= 256 ://最高延迟16帧----60帧频的情况下8帧约是256毫秒，以40帧频运行
            //     {
            //         this._frameRate = 40;
            //         break;
            //     }
            //     case tick <= 512 ://最高延迟32帧----60帧频的情况下8帧约是512毫秒，以30帧频运行
            //     {
            //         this._frameRate = 30;
            //         break;
            //     }
            //     case tick <= 1024 ://,,...........
            //     {
            //         this._frameRate = 20;
            //         break;
            //     }
            //     case tick <= 2048 ://,,...........
            //     {
            //         this._frameRate = 10;
            //         break;
            //     }
            //     default :
            //     {
            //         //已经超出最大延迟了
            //         break;
            //     }
            // }
            // this._interval = Math.floor(this.SECOND_INTERVAL / this._frameRate);            
        }

        /**
         * 开平方根
         * @param num 
         * @param value 
         * @returns 
         */
        protected sqr(num:number, value:number)
        {
             num = (num / value)
            let count:number = 1 //默认为1
            while(num > 0)
            {   
                count ++;
                if (num >= 1)
                {
                    num = num / value
                }
                else break;//不足1次方计算，直接默认+1，中断循环
            }
            return count;
        }
    }
}
