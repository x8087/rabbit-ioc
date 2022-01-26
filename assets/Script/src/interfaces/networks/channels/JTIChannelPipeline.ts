 

module com 
{
    export interface JTIChannelPipeline extends JTIChannelOption, JTIChannelState, JTIChannelContextMap, JTIConnection, JTIMarkChannelConnected
     {
          bind(channel:JTIChannel):JTIChannel

          config(host:string, port:number):JTIMarkChannelConnected

          launch(host:string, port:number):JTIChannel
 
     
     }
}
