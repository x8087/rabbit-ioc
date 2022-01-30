module com 
{
      export interface JTIEncoderAdapter extends JTIChannelWrite
      {
            encode(data:any):any;

            writeComplete(data:any):void; 
      }
}
