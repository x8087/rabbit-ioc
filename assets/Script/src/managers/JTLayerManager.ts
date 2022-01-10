///<reference path="../run/JTClassExtension.ts"/>
namespace com 
{
    export class JTLayerManager extends JTClassExtension
    {
        public static LAYER_TIPS: string = "layer_tips";
        public static LAYER_SCENE: string = "layer_scene";
        public static LAYER_POPUP: string = "layer_popup";


        private _layerMap:Object = null;
        private _stage:fgui.GRoot = null;

        constructor(stage:fgui.GRoot)
        {
            super();
            this._stage = stage;
        }

        public build():void
        {
            this.createLayer(JTLayerManager.LAYER_SCENE);
            this.createLayer(JTLayerManager.LAYER_POPUP);
            this.createLayer(JTLayerManager.LAYER_TIPS);
        }
        
        private createLayer(type:string):fgui.GComponent 
        {
            let layer: fgui.GComponent = new fgui.GComponent();
            layer.makeFullScreen();
            this._layerMap[type] = layer;
            this._stage.addChild(layer);
            return layer;
        }

        public getLayer(type:string):fgui.GComponent 
        {
            return this._layerMap[type];
        }

    }
}
