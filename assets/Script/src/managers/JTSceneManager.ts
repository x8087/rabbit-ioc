namespace com 
{
    export class JTSceneManager extends JTExtensionClass
    {
        private static _stage:fgui.GRoot = null;

        constructor()
        {
            super();
        }

        public build():void 
        {
            
        }

        public static get stage():fgui.GRoot 
        {
            return this._stage;
        }

    }
}
