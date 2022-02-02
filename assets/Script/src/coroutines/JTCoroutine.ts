module com 
{
    /**
     * 协程
     */
    export class JTCoroutine implements JTICoroutine
    {
        protected __lockedMap:any = null;
        protected __lockedCount:number = 0;
        protected __currentLocked:JTITaskLocker = null;

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
            let locker:JTITaskLocker = this.__lockedMap[key];
            if (locker) return locker.lock();
            this.__currentLocked = locker = JTLocker.create() as JTITaskLocker;
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

        public unlock(...args):void
        {
            let key:string = args.shift();
            let locker:JTILocker = this.__lockedMap[key] as JTILocker;
            if (!locker) return;
            this.remove(key, locker);
            locker.unlock(args);
            JTLocker.put(locker);
        }

        /**
         * 
         * @param key 
         */
        public kill(...args):void
        {
            let key:string = args.shift();
            let locker:JTILocker = this.__lockedMap[key] as JTILocker;
            if (!locker) return;
            this.remove(key, locker);
            locker.kill(args);
            JTLocker.put(locker);
        }

        protected remove(key:number | string, locker:JTILocker):void
        {
            -- this.__lockedCount;
            this.__lockedMap[key] = null;
            delete this.__lockedMap[key]
            this.__currentLocked = null;
        }
        
        public get locked():boolean
        {
            return this.__lockedCount > 0
        }

        public tryLock(key:any):Promise<any>
        {
            return this.locked ? this.__currentLocked.signal : this.lock(key);
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