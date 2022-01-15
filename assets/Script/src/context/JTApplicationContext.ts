///<reference path="../events/JTEventSignaler.ts"/>
namespace com 
{
    /**
     * 扩展基类
     */
    export abstract class JTApplicationContext extends JTEventSignaler implements JTIApplicationContext
    {
        constructor()
        {
            super();
        }

        /**
         * 扩展类构建--回调
         */
        public abstract build():void;
        /**
         * 扩展类构建完成--回调
         */
        public abstract buildComplete():void;
    }
}
