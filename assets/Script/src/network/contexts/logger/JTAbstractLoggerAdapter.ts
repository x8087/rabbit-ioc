module com 
{
    export abstract class JTAbstractLoggerAdapter extends JTChannelContext implements JTIChannelLoggerAdapter
    {
        constructor( )
        {
            super();
        }

        public abstract channelRead(msg:any):void;

        public abstract channelWrite(msg:any):void; 

        public get sortId():number
        {
            return JTChannelContextSortId.LOGGER;
        }

    }

    
}