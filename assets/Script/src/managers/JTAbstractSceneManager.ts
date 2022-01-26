module com 
{
    export abstract class JTAbstractSceneManager extends JTOptionContext implements JTISceneManager
    {
        private _layer:fgui.GComponent = null;

        public static locker:JTLocker = new JTLocker();

        private _sceneMap:{[name:string]:any} = null;
        private _hostroys:string[] = null;

        private static _instance:JTISceneManager = null;

        constructor()
        {
            super();
            this._sceneMap = {};
            this._hostroys = [];
            // cc.macro.CLEANUP_IMAGE_CACHE = false;
            // cc.dynamicAtlasManager.enabled = true;
            // cc.view.setDesignResolutionSize(JTSession.designWidth, JTSession.designHeight, cc.ResolutionPolicy.FIXED_WIDTH);
            // var size: cc.Size = cc.view.getVisibleSize();
            // JTSession.stageWidth = size.width;
            // JTSession.stageHeight = size.height;
        }

        public build():void 
        {
            let sceneManager:JTAbstractSceneManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_SCENE);
            JTAbstractSceneManager._instance = sceneManager;
            if (!this._layer)
            {
                let layerManager:JTAbstractLayerManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_LAYER);
                this._layer = layerManager.getLayer(JTAbstractLayerManager.LAYER_SCENE) as fgui.GComponent ;
            }
        }

        public buildComplete(): void 
        {
            
        }

        protected registerSceneClassAlias(type:string, cls:any):void 
        {
            this._sceneMap[type] = cls;
        }

        public async changeScene(sceneType:string):Promise<any> 
        {
            let cls:any = this._sceneMap[sceneType];
            let scene:JTScene<fgui.GComponent> = new cls();
            this._hostroys.push(sceneType);
            await JTAbstractSceneManager.locker.lock();
            while (this.layer.numChildren) this._layer.removeChildAt(0);
            this.addChild(scene, fgui.RelationType.Height);
        }

        public addChild(scene:JTIScene, type?:number):void
        {
            scene.bindUIRelation(this.layer, type)
            this.layer.addChild(scene.componentUI);
        }

        public back():string
        {
            let type:string = null;
            if (this._hostroys.length > 0)
            {
                type = this._hostroys.pop();
                this.changeScene(type);
            }
            return type;
        }
    
        public static back():void 
        {
            this._instance.back();
        }

        public static changeScene(sceneType:string):void
        {
            this._instance.changeScene(sceneType);
        }

        public get layer():fgui.GComponent 
        {
            return this._layer;
        }

        public static get instance():JTISceneManager
        {
            return this._instance;
        }


    }
}
