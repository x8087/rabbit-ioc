module com
{
        export class JTServerConfigTemplate extends com.JTBaseTemplate
        {
                public port:number = 0;
                public host:string = null;
                constructor()
                {
                        super();
                }

                public setup(host:string, port:number):void
                {
                        this.port = port;
                        this.host = host;
                }

        }
}
