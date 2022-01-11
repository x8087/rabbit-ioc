
namespace com 
{
    export class JTPopupManager
    {
        private static __layer:fgui.GComponent = null;
        private static __childs:JTChildPopUp[] = [];
        private static __graphics:fgui.GGraph = null;
        public static initialize():void
        {

        }

        public static createPopUp(__class:any, parent?:fgui.GComponent, 
                                isTween:boolean = false, mode:boolean = true):JTIComponent
        {
            let child:JTIComponent = new __class();
            return this.addPopUp(child, parent, isTween, mode) 
        }

        public static center(componentUI:fgui.GComponent):void
        {

        }

        public static removePopUp():any
        {

        }

        public static addPopUp(component:JTIComponent, parent?:fgui.GComponent, isTween:boolean = false, mode:boolean = true):JTIComponent
        {
            let childPopUp:JTChildPopUp = this.search(component);
            if (!childPopUp)
            {
                childPopUp = new JTChildPopUp();
                childPopUp.parent = parent;
                childPopUp.isTween = isTween;
                childPopUp.mode = mode;
                childPopUp.component = component;
                this.__childs.push(childPopUp);
            }
            else
            {
                childPopUp.parent = parent;
                childPopUp.mode = mode;
                childPopUp.isTween = isTween;
            }
            if (!this.__graphics)
            {
                this.__graphics = new fgui.GGraph();
                this.__graphics.clearGraphics();
                this.__graphics.setSize(JTSession.stageWidth, JTSession.stageHeight)
                this.__graphics.drawRect(0, null, null, null);
  
            }
            return component;
        }

        /**
         * 搜索列表中是否该对象已经弹出了。
         * @param component 需要弹出的显示对象
         * @returns 
         */
        private static search(component:JTIComponent):JTChildPopUp
        {
            let count:number = this.__childs.length;
            for (let i:number = 0; i < count; i++)
            {
                    let childPopUp:JTChildPopUp = this.__childs[i];
                    if (childPopUp.component == component)
                    {
                            return childPopUp;
                    }
            }
            return null;
        }

        public static removes():void
        {

        }

        public static get layer():fgui.GComponent
        {
            if (!this.__layer)
            {                
                let layerManager:JTLayerManager = JTApplication.getExtensionItem(JTApplication.LAYER);
                this.__layer = layerManager.getLayer(JTLayerManager.LAYER_POPUP);
            }
            return this.__layer;
        }
    }
}
