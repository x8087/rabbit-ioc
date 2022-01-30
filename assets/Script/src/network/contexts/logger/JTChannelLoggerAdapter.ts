module com 
{
    export abstract class JTChannelLoggerAdapter extends JTChannelContext implements JTIChannelLoggerAdapter
    {
        constructor( )
        {
            super();
        }

        public readComplete(msg:any):void 
        {
            
        }

        public writeComplete(msg:any):void 
        {
        }
    }

    
}