module com 
{
     export interface JTIDecoderAdapter extends JTIChannelContext
     {
          decode(data:any):any;

          readComplete(receivePackage:JTIReceivePackage):void;
     
     }
}