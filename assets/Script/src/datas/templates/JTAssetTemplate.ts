///<reference path="base/JTBaseTemplate.ts"/>
module com
{
        export class JTAssetTemplate extends JTBaseTemplate
        {
                public name:string = null;
                public version:string = null;
                constructor()
                {
                        super();
                }

                public getAssetUrl():string
                {
                        return null;
                }
        }
}
