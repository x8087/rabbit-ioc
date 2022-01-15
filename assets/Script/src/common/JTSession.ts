namespace com 
{
     export class JTSession
     {
          public static channel:JTIChannel = null;

          public static designHeight:number = 0;
          public static designWidth:number = 0;
  
          public static stageWidth:number = 0;
          public static stageHeight:number = 0;

          public static _stage:fgui.GRoot = null;

          public static get stage():fgui.GRoot
          {
               if (!this._stage) 
               {
                   this._stage = fgui.GRoot.create();
                   this._stage.setPosition(0, 0);
               }
               return this._stage;
          }
     }
}
