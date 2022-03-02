module com 
{
    /**
     * 此类的属性太多，不需要扩展instance
     * 继承直接单例注入instance就好了。
     */
    export abstract class JTAbstractTemplateManager extends JTOptionContext implements JTITemplateInfoManager
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

        public  abstract getTextureTemplate(id:string):JTAssetTemplate;
      
        public  abstract getAssetConfigTemplate(id:string):JTLocalConfigTemplate;

        public static  getInstance():JTAbstractTemplateManager
        {
            return null;
        }

        public static getTextureTemplate(id:string):JTTextureAssetTemplate
        {
            return this.getInstance().getTextureTemplate(id);
        }

        public static getLocalConfigTemplate(type:string):JTLocalConfigTemplate
        {
            return this.getInstance().getAssetConfigTemplate(type)
        }

        public static getAssetUrl(type:string, id:string):string
        {
            let templateInfoManager:JTAbstractTemplateManager = this.getInstance();
            let localConfigTemplate:JTLocalConfigTemplate = templateInfoManager.getAssetConfigTemplate(type);
            let assetTemplate:JTAssetTemplate = templateInfoManager.getTextureTemplate(id) as JTAssetTemplate;
            let url:string = localConfigTemplate.url + "/" + assetTemplate.name;
            return url;
        }
      
    }
}
