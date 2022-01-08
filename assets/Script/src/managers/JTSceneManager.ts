namespace com 
{
    export class JTSceneManager
    {
        private static _layerManager:JTLayerManager = null;
        
        private static _stage:fgui.GRoot = null;


        public static initialize():void
        {
            if (!this._stage) 
            {
                this._stage = fgui.GRoot.create();
                this._layerManager = new JTLayerManager(this._stage);
            }
        }

        public static get stage():fgui.GRoot 
        {
            return this._stage;
        }
    }
}
