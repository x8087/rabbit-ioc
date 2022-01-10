///<reference path="JTAbstractChannelAdapter.ts"/>
namespace com 
{
    export abstract class JTChannelAdapter extends JTAbstractChannelAdapter
    {
        public static ENCODE:string = "encode";
        public static DECODE:string = "decode";
        public static IDLE:string = "idle";
        constructor( )
        {
            super();
        }
    }
}