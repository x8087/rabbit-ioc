///<reference path="base/JTBaseTemplate.ts"/>
module com
{
        export class JTSoundAssetTemplate extends JTAssetTemplate
        {
                constructor()
                {
                        super();
                }

                public getAssetUrl():string
                {
                        let templateInfoManager:JTAbstractTemplateManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_TEMPLATE)
                        let localConfig:JTLocalConfigTemplate = templateInfoManager.getAssetConfigTemplate("sound");
                        return localConfig.url + this.name;
                }
        }
}
