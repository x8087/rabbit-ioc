namespace com 
{
     export function execute(key:string, args?:string):void
     {
          com.JTFunctionManager.execute(key, args);
     }

     export function dispatchEvent(key:string, args):void
     {
          com.JTEventManager.dispatchEvent(key, args);
     }

     export function info(...msgs):void
     {
          let content:string = "";
          for (var i:number = 0; i < msgs.length; i ++)
          {
               content += msgs[i];
          }
          com.JTLogger.info(content);
     }

     export function error(...msgs):void
     {
          let content:string = "";
          for (var i:number = 0; i < msgs.length; i ++)
          {
               content += msgs[i];
          }
          com.JTLogger.error(content);
     }

     export function debug(...msgs):void
     {
          let content:string = "";
          for (var i:number = 0; i < msgs.length; i ++)
          {
               content += msgs[i];
          }
          com.JTLogger.debug(content);
     }


     export function assets(flag:Boolean, ...msgs):void
     {
          let content:string = "";
          for (var i:number = 0; i < msgs.length; i ++)
          {
               content += msgs[i];
          }
          com.JTLogger.assert(flag,content);
     }
}
