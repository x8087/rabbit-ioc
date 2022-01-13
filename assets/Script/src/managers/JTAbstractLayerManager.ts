///<reference path="../context/JTApplicationContext.ts"/>
namespace com 
{
    export abstract class JTAbstractLayerManager extends JTApplicationContext
    {
        public static LAYER_TIPS: string = "layer_tips";
        public static LAYER_SCENE: string = "layer_scene";
        public static LAYER_POPUP: string = "layer_popup";
        public static LAYER_MAP: string = "layer_map";
        public static LAYER_MASK: string = "layer_mask";

        private _layerMap:Object = null;
        private _stage:fgui.GRoot = null;

        constructor(stage?:fgui.GRoot)
        {
            super();
            this._stage = stage;
        }

        public build():void
        {
            if (!this._stage) 
            {
                this._layerMap = {};
                this._stage = fgui.GRoot.create();
                this.createLayer(JTAbstractLayerManager.LAYER_MAP);
                this.createLayer(JTAbstractLayerManager.LAYER_SCENE);
                this.createLayer(JTAbstractLayerManager.LAYER_MASK);
                this.createLayer(JTAbstractLayerManager.LAYER_POPUP);
                this.createLayer(JTAbstractLayerManager.LAYER_TIPS);
            }
        }
        
        private createLayer(type:string):fgui.GComponent 
        {
            let layer:fgui.GComponent = new fgui.GComponent();
            layer.makeFullScreen();
            this._layerMap[type] = layer;
            this._stage.addChild(layer);
            return layer;
        }

        public addChildTo(componentUI:fgui.GComponent, type:string):void
        {
            let layer:fgui.GComponent = this.getLayer(type);
            layer.addChild(componentUI);
        }

        public getLayer(type:string):fgui.GComponent 
        {
            return this._layerMap[type];
        }

        public get stage():fgui.GRoot
        {
            return this._stage;
        }
    }
}
