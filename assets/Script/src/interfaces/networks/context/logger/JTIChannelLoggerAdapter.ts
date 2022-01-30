module com 
{
     export interface JTIChannelLoggerAdapter extends JTIChannelContext
     {
          channelRead(msg:any):void 

          channelWrite(msg:any):void 
     }
}