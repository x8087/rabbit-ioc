module com 
{
    /**
     * 协程
     */
    export class JTCoroutine implements JTICoroutine
    {
        protected __currentLocked:JTITaskLocker = null;
        protected __lockedMap:any = null;
        protected __lockedCount:number = 0;

        constructor()
        {
            this.__lockedMap = {}
        }

        /**
         * 
         * @param key 
         * @returns 
         */
        public lock(key:number | string):Promise<any>
        {
            let locker:JTITaskLocker = this.__currentLocked = JTLocker.create() as JTITaskLocker;
            this.__lockedMap[key] = locker;
            this.__lockedCount ++;
            return locker.lock();
        }

        /**
         * 
         * @param key 
         */
        public release():void
        {
            for (var key in this.__lockedMap)
            {
                 this.unlock(key);
            }
        }

        public unlock(key:number | string):void
        {
            let locker:JTLocker = this.__lockedMap[key] as JTLocker;
            if (!locker) return;
            locker.release();
            this.remove(key, locker);
        }

        /**
         * 
         * @param key 
         */
        public kill(key:any):void
        {
            let locker:JTLocker = this.__lockedMap[key] as JTLocker;
            if (!locker) return;
            locker.kill();
            this.remove(key, locker);
     
        }

        protected remove(key:number | string, locker:JTLocker):void
        {
            -- this.__lockedCount;
            this.__lockedMap[key] = null;
            delete this.__lockedMap[key]
            JTLocker.put(locker);
        }
        
        public get locked():boolean
        {
            return this.__lockedCount > 0
        }

        public tryLock(key:any):Promise<any>
        {
            return this.__currentLocked.signal ? this.__currentLocked.signal : this.lock(key);
        }

        public get lockedCount():number
        {
            return this.__lockedCount;
        }

        public recycle() 
        {
            this.__lockedCount = 0;
            this.__lockedMap = {};
            this.__currentLocked = null;
        }

        public static create():JTCoroutine
        {
            return JTPool.instance(JTCoroutine).get() as JTCoroutine;
        }
    }
}