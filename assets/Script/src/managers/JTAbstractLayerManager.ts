///<reference path="../context/JTApplicationContext.ts"/>
namespace com 
{
    export abstract class JTAbstractLayerManager extends JTApplicationContext implements JTILayerManager
    {
        public static LAYER_TIPS: string = "layer_tips";
        public static LAYER_SCENE: string = "layer_scene";
        public static LAYER_POPUP: string = "layer_popup";
        public static LAYER_MAP: string = "layer_map";
        public static LAYER_MASK: string = "layer_mask";

        private _layerMap:Object = null;
        private _stage:fgui.GRoot = null;


        private static _instance:JTILayerManager = null;

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
                this._stage.makeFullScreen();
                let layerManager:JTILayerManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.CONTEXT_LAYER);
                JTAbstractLayerManager._instance = layerManager;
                this.createLayers();
            }
        }

        protected registerWindowResize():void
        {
            window.addEventListener("resize", this.onResize);
        }

        protected onResize(e):void
        {
                dispatchEvent(JTResizeEvent.RESIZE);
        }

        /**
         * 默认创建五层
         * 可以根据项目的需要自定义DIV层级数
         */
        protected createLayers():void
        {
            this.createLayer(JTAbstractLayerManager.LAYER_MAP);
            this.createLayer(JTAbstractLayerManager.LAYER_SCENE);
            this.createLayer(JTAbstractLayerManager.LAYER_MASK);
            this.createLayer(JTAbstractLayerManager.LAYER_POPUP);
            this.createLayer(JTAbstractLayerManager.LAYER_TIPS);
        }
        
        public createLayer(type:string):fgui.GComponent 
        {
            let layer:fgui.GComponent = new fgui.GComponent();
            layer.makeFullScreen();
            layer.setPivot(.5, .5);
            layer.setPosition(0, 0);
            this._layerMap[type] = layer;
            this._stage.addChild(layer);
            return layer;
        }

        public addToLayer(componentUI:fgui.GComponent, type:string):void
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

        public static addToLayer(componentUI:fgui.GComponent, type:string):void
        {
            this._instance.addToLayer(componentUI, type);
        }

        public static getLayer(type:string):fgui.GComponent
        {
            return this._instance.getLayer(type);
        }

        public static get stage():fgui.GRoot
        {
            return this._instance.stage;
        }

        public static get instance():JTILayerManager
        {
            return this._instance;
        }
    }
}
