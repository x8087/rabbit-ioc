namespace com 
{
        export class JTSingleManager
        {
                public static instance:JTSingleManager = null;

                // @SingletonClass(JTPool, JTCommand)
                public protocolManager:JTProtocolItemManager = null;

                constructor()
                {       
                        let cls:any = JTApplication.getClass(JTApplication.PROTOCOL_MANAGER);
                        this.protocolManager = new cls();
                }

                public static initialize():void
                {
                        if(!this.instance)
                        {
                                this.instance = new JTSingleManager();
                        }
                }
        }
}
