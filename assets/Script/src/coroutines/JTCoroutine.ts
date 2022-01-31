module com 
{
    /**
     * 协程
     */
    export class JTCoroutine implements JTILocker
    {
        protected __currentLocked:JTSignal = null;
        protected __lockeds:JTSignal[] = null;

        constructor()
        {
            this.__lockeds = [];
        }

        /**
         * 如果不传结果，则会返回JTLocker自身
         * @param __result 
         * @returns 
         */
        public lock(__result?:any):Promise<any>
        {
            let caller:any = __result ? __result : this;
            let succeed:Function = null;
            let fail:Function = null;
            let promise:Promise<any> = new Promise((resolve, reject) => 
            {
                succeed = resolve;
                fail = reject;
            })
            let signal:JTSignal = this.__currentLocked = JTSignal.create();
            signal.setup(caller, promise, succeed, fail);
            this.__lockeds.push(signal);
            return promise;
        }

        public release():void
        {
            let loadedCount:number = this.__lockeds.length;
            if (loadedCount > 0)
            {
                let locked:JTSignal = this.__lockeds.shift();
                locked.release();
                this.__currentLocked = null;
                -- loadedCount ;
            }
            if (loadedCount > 0)
            {
                this.__currentLocked = this.__lockeds[loadedCount - 1];
            }
        }

        public kill():void
        {
            let loadedCount:number = this.__lockeds.length;
            if (loadedCount > 0)
            {
                let locked:JTSignal = this.__lockeds.shift();
                locked.kill();
                this.__currentLocked = null;
                -- loadedCount ;
            }
            if (loadedCount > 0)
            {
                this.__currentLocked = this.__lockeds[loadedCount - 1];
            }
        }

        public locked():boolean
        {
            return this.__lockeds.length > 0;
        }

        /**
         * 如果不传结果，则会返回JTLocker自身
         * @param __result 
         * @returns 
         */
        public tryLock(__caller:any):Promise<any>
        {
            return this.locked() ? this.__currentLocked.promise : this.lock(__caller);
        }

        public recycle() 
        {
     
        }

        public static create():JTCoroutine
        {
            return JTPool.instance(JTCoroutine).get() as JTCoroutine;
        }
    }
}