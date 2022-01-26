module com 
{
      export interface JTIEncoderAdapter extends JTIChannelContext
      {
            encode(data:any):any;

            writeComplete(data:any):void; 
      }
}
