 

module com 
{
    export interface JTIChannelPipeline extends JTIChannelOption, JTIChannelState, JTIChannelContextMap, JTIConnection, JTIMarkConnected
     {
          bind(channel:JTIChannel):JTIChannel

          config(host:string, port:number):JTIMarkConnected

          launch(host:string, port:number):JTIChannel
 
     
     }
}
