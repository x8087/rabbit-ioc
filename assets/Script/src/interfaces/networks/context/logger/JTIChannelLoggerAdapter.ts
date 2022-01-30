module com 
{
     export interface JTIChannelLoggerAdapter extends JTIChannelContext
     {
          readComplete(msg:any):void 

          writeComplete(msg:any):void 
     }
}