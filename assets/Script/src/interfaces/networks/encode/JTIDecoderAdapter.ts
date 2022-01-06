namespace com 
{
     export interface JTIDecoderAdapter 
     {
          decode(data:any):any;

          readComplete(receivePackage:JTIReceivePackage):void;
     
     }
}