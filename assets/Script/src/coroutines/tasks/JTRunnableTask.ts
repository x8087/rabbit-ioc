///<reference path="JTTask.ts"/>
module com 
{
    /**
     * 任务基类
     */
    export abstract class JTRunnableTask extends JTTask implements JTIRunnableTask
    {
        protected _loop:number = 0;
        protected _currentTimes:number = 0;
        protected _locker:JTILocker = null;
        protected _index:number = 0;

        constructor()
        {
            super();
        }

        public relevance(index:number, counter:JTILocker):void 
        {
            this._index = index;
            this._locker = counter;
        }

        public set loop(value:number)
        {
            this._loop = value;
        }

        public get loop():number
        {
            return this._loop;
        }

        public get currentTimes():number
        {
            return this._currentTimes;
        }

        protected release():void
        {
            this._locker.unlock(this._id);
            this._currentTimes ++;
        }

        public done():boolean
        {
            if (this._loop != 0)
            {
                return this._loop >= this._currentTimes ? true : false;
            }
            else
            {
                return false;
            }
        }

        protected kill():void
        {
            this._locker.kill(this._id);
        }

        public recycle() 
        {
            super.recycle();
            this._loop = -1;
            this._currentTimes = 0;
            this._locker = null;
        }
    }
}