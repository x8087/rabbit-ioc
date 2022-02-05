module com 
{
    export class JTLocalCache implements JTIPoolObject
    {
        private _dataMap:Object = null;
        private _name:string = null;
        private static localCache:Storage = null;
        /**
         * 通过名字来获取本地缓存对象。
         */
        constructor(name:string)
        {
            JTLocalCache.localCache = window.localStorage;
            this.name = name;
        }

        public set name(value:string)
        {
            this._name = value;
            if (JTLocalCache.localCache[value])
            {
                this._dataMap = JSON.parse(JTLocalCache.localCache[value]);
            }
            else
            {
                this._dataMap = {};
                this.update();
            }
        }

        public setObject(key:string, data:any):void
        {
            this._dataMap[key] = data;
            this.update();
        }

        public getObject(key:string):any
        {
            return this._dataMap[key];
        }

        public hasKey(key:string):boolean
        {
            return key in this._dataMap;
        }

        public delete(key:string):void
        {
            this._dataMap[key] = null;
            delete this._dataMap [key];
            this.update();
        }

        private update():void
        {
            JTLocalCache.localCache.setItem(this._name, JSON.stringify(this._dataMap));
        }

        public clean():void
        {
            this._dataMap = {};
            this.update();
        }

        public recycle():void
        {
            this.clean();
            this._name = null;
        }

        public get dataMap():Object
        {
            return this._dataMap;
        }
    }
}