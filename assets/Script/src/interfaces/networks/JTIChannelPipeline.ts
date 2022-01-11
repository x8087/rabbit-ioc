 

namespace com 
{
    export interface JTIChannelPipeline extends JTIChannelOption
     {
          channel:JTIChannel;

          bind(channel:JTIChannel):JTIChannel

          getOption(type:string):JTIChannelAdapter

          launch(host:string, port:number):JTIChannel
     
     }
}
