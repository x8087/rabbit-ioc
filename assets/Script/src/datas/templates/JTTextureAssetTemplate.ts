///<reference path="base/JTBaseTemplate.ts"/>
module com
{
        export class JTTextureAssetTemplate extends JTAssetTemplate
        {
                constructor()
                {
                        super();
                }

                public getAssetUrl():string
                {
                        let templateInfoManager:JTAbstractTemplateManager = JTAbstractTemplateManager.getInstance();
                        let localConfig:JTLocalConfigTemplate = templateInfoManager.getAssetConfigTemplate("texture");
                        return localConfig.url + this.name;
                }
        }
}
