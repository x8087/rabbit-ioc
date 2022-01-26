///<reference path="../events/JTEventSignaler.ts"/>
module com 
{
    /**
     * 扩展基类
     */
    export abstract class JTOptionContext extends JTEventSignaler implements JTIOptionContext
    {
        protected _builded:boolean = false;
        protected _buildCompleted:boolean = false;
        constructor()
        {
            super();
        }
        
        public get builded():boolean
        {
            return this._builded;
        }

        public get buildCompleted():boolean
        {
            return this._buildCompleted;
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
