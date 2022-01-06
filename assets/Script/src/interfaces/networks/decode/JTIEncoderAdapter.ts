namespace com 
{
      export interface JTIEncoderAdapter 
      {
            encode(data:any):any;

            writeComplete(data:any):void; 
      }
}
