 

namespace com 
{
    export interface JTIReceivePackage extends JTIPoolObject
     {
          content:Object;

          protocol:number;

          status:number;

          errorCode:number;

          readPackage(data:any):void
     }
}
