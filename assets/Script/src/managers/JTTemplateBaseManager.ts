namespace com 
{
    export abstract class JTTemplateBaseManager extends JTApplicationContext
    {
        public _configMap:{[url:string]: any} = {}
        constructor()
        {
            super();
        }

        public abstract updateConfigs(configs:any[]):void;

        public build():void
        {

        }

        public put(url:string, data:any):void
        {
                this._configMap[url] = data;
        }

        public getValue(url:string):any
        {
                return this._configMap[url];
        }   
    }
}
