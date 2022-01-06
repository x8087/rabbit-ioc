namespace com 
{
    export abstract class JTChannelAdapter extends JTEventDispatcher
    {
        protected _channel:JTIChannel = null;

        public static ENCODE:string = "encode";
        public static DECODE:string = "decode";
        public static IDLE:string = "idle";
        constructor( )
        {
            super();
        }

        public abstract channelActive():void;

        public get channel():JTIChannel
        {
            return this._channel;
        }

        public bind(channel:JTIChannel):void
        {
            this._channel = channel;
        }
    }
}