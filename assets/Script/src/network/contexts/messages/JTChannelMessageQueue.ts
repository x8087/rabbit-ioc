module com 
{
    export abstract class JTChannelMessageQueue extends JTChannelContext
    {
        protected __messageQueue:any[] = null;
        constructor( )
        {
            super();
            this.__messageQueue = [];
        }
    }
}