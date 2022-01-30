 

module com 
{
    export interface JTIChannelPipeline extends JTIChannelOption, JTIChannelState, JTIConnection, JTIMarkConnected
     {

          bind(channel:JTIChannel):JTIChannel

          config(host:string, port:number):JTIMarkConnected

          launch(host:string, port:number):JTIChannel
 
          setEventLoopGroup(readEventLoop:JTChannelEventLoop, writeEventLoop:JTChannelEventLoop):void
     }
}
