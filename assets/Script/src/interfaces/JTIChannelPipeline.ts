 

namespace com 
{
    export interface JTIChannelPipeline 
     {
          bind(channel:JTIChannel):JTIChannel

          addAdapter(type:string, channelAdapter:JTChannelAdapter):JTChannelPipeline
     
          getAdapter(type:string):JTChannelAdapter

          launch(host:string, port:number):void
     
     }
}
