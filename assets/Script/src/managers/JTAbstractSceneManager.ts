module com 
{
    export abstract class JTAbstractSceneManager extends JTOptionContext implements JTISceneManager
    {
        private _layer:fgui.GComponent = null;

        public static locker:JTLocker = JTCounter.create();

        private static _sceneMap:{[name:string]:any} = {};
        private _hostroys:string[] = null;

        private static _instance:JTISceneManager = null;

        constructor()
        {
            super();
            this._hostroys = [];
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
            JTAbstractSceneManager._sceneMap[type] = cls;
        }

        public async changeScene(sceneType:string):Promise<any> 
        {
            let cls:any = JTAbstractSceneManager.getSceneClass(sceneType)
            let scene:JTScene<fgui.GComponent> = new cls();
            this._hostroys.push(sceneType);
            await JTAbstractSceneManager.lock();
            while (this.layer.numChildren) this._layer.removeChildAt(0);
            this.addChild(scene, fgui.RelationType.Height);
        }

        public addChild(scene:JTIScene, type?:number):void
        {
            scene.bindUIRelation(this.layer, type)
            this.layer.addChild(scene.componentUI);
        }

        public static async lock()
        {
           await this.locker.lock();
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

        public static registerToSceneManager(type:string, sceneClass:any):void 
        {
            this._sceneMap[type] = sceneClass;
        }

        public static getSceneClass(sceneType:string):any
        {
            return this._sceneMap[sceneType];
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
