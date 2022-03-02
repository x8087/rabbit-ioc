module com
{
        export class JTLocalConfigTemplate extends JTBaseTemplate
        {
                public url:string = null;
                public version:string = null;
                constructor()
                {
                        super();
                }

                public static getAssetConfig(id:string):JTLocalConfigTemplate
                {
                        return null;
                }
        }
}
