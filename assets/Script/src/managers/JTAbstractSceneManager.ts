namespace com 
{
    export abstract class JTAbstractSceneManager extends JTApplicationContext
    {
        private _layer:fgui.GComponent = null;

        public static _locker:JTLocker = null;

        private _sceneMap:{[name:string]:any} = null;

        constructor()
        {
            super();
            this._sceneMap = {};
            // cc.macro.CLEANUP_IMAGE_CACHE = false;
            // cc.dynamicAtlasManager.enabled = true;
            // cc.view.setDesignResolutionSize(JTSession.designWidth, JTSession.designHeight, cc.ResolutionPolicy.FIXED_WIDTH);
            // var size: cc.Size = cc.view.getVisibleSize();
            // JTSession.stageWidth = size.width;
            // JTSession.stageHeight = size.height;
        }

        public build():void 
        {
            
        }

        protected registerSceneClassAlias(type:string, cls:any):void 
        {
            this._sceneMap[type] = cls;
        }

        public async changeScene(type:string):Promise<any> 
        {
            let cls:any = this._sceneMap[type];
            let scene:JTScene<fgui.GComponent> = new cls();
            await JTAbstractSceneManager.locker.lock();
            while (this.layer.numChildren) this._layer.removeChildAt(0);
            this.layer.addChild(scene.componentUI);
        }
    
        public static back():void 
        {
    
        }

        public get layer():fgui.GComponent 
        {
            if (!this._layer)
            {
                let layerManager:JTAbstractLayerManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_LAYER);
                this._layer = layerManager.getLayer(JTAbstractLayerManager.LAYER_SCENE) as fgui.GComponent ;
            }
            return this._layer;
        }


        public static get locker():JTLocker
        {
            if (!this._locker) 
            {
                this._locker = new JTLocker();
            }
            return this._locker
        }
    }
}
