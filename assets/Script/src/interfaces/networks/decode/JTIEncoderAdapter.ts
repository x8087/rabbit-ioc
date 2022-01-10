namespace com 
{
      export interface JTIEncoderAdapter extends JTIChannelAdapter
      {
            encode(data:any):any;

            writeComplete(data:any):void; 
      }
}
