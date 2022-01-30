module com 
{
     export interface JTIDecoderAdapter extends  JTIChannelRead
     {
          decode(data:any):any;

          readComplete(receivePackage:JTIReceivePackage):void;
     
     }
}