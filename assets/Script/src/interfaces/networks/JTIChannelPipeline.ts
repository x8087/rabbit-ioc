 

namespace com 
{
    export interface JTIChannelPipeline extends JTIChannelOption, JTIChannelState, JTIChannelContextMap
     {
          bind(channel:JTIChannel):JTIChannel



          launch(host:string, port:number):JTIChannel
     
     }
}
