namespace com 
{
    export class JTTemplateBaseManager extends JTDataInfoManager
    {
        public _configMap:{[url:string]: any} = {}
        constructor()
        {
            super();
        }

        public load():void
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
