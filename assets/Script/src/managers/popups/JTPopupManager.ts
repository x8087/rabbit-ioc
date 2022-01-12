
namespace com 
{
    export class JTPopupManager
    {
        private static __layer:fgui.GComponent = null;
        private static __childs:JTChildPopUp[] = [];
        /**
         * 弹窗蒙板
         */
        private static __backgroundMask:fgui.GGraph = null;
        public static initialize():void
        {

        }

        public static createPopUp(__class:any, parent?:fgui.GComponent, 
                                isTween:boolean = false, mode:boolean = true):JTIComponent
        {
            let child:JTIComponent = new __class();
            return this.addPopUp(child, parent, isTween, mode) 
        }

        public static centerComponent(component:JTIComponent):void
        {

        }

        public static center(componentUI:fgui.GComponent):void
        {

        }

        /**
         * 
         * @param component 
         * @param parent 
         * @param isTween 
         * @param mode 
         * @returns 
         */
        public static addPopUp(component:JTIComponent, parent?:fgui.GComponent, isTween:boolean = false, mode:boolean = true):JTIComponent
        {
            parent = parent ? parent : this.layer; //如果没有父容器，则直接使用PopUp的容器
            let childPopUp:JTChildPopUp = this.search(component);
            if (!childPopUp)
            {
                childPopUp = this.pool.get() as JTChildPopUp;
                childPopUp.setup(component, parent, isTween, mode);
                this.__childs.push(childPopUp);
            }
            else
            {
                childPopUp.setup(component, parent, isTween, mode);
            }
            if (!this.__backgroundMask)//由于FraiyGUI graphics 画的接口暴露了cocos的方法，所以可能要使用UI编辑器来画一张图
            {
                this.__backgroundMask = new fgui.GGraph();
                this.__backgroundMask.clearGraphics();
                this.__backgroundMask.setSize(JTSession.stageWidth, JTSession.stageHeight);
                this.__backgroundMask.drawRect(0, null, null, null);
            }
            if (childPopUp.mode)
            {
                    //显示遮挡层
            }
            if (isTween)
            {

            }
            else
            {
                
            }
            return component;
        }

        /**
         * 
         * @param component 
         * @param isTween 
         * @returns 
         */
        public static removePopUp(component:JTIComponent, isTween:boolean = false):JTIComponent
        {
            let childPopUp:JTChildPopUp = this.removeComponent(component);
            if (!childPopUp) return component;
            if (!isTween)           this.put(childPopUp);
            else
            {
                    //缓动消失逻辑
            }
            return component;
        }

        /**
         * 
         * @param parent 
         */
        public static removes(parent?:fairygui.GComponent):void
        {
            let lines:JTChildPopUp[] = null;
            if (parent)
            {
                 lines = this.removeGComponent(parent);
            }
            else
            {
                lines = this.__childs;
            }
            while(lines.length)
            {
                let childPopUp:JTChildPopUp = lines.shift();
                this.put(childPopUp);
            }
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

        private static removeGComponent(parent:fgui.GComponent):JTChildPopUp[]
        {
            let lines:JTChildPopUp[] = [];
            for (let i:number = 0; i < this.__childs.length; i++)
            {
                let childPopUp:JTChildPopUp = this.__childs[i];
                if (childPopUp.parent == parent)
                {
                    let lines:JTChildPopUp[] = this.__childs.splice(i, 1);
                    let child:JTChildPopUp = lines.shift();
                    lines.push(child);
                    i--;
                }
            }
            return lines;
        }

        private static removeComponent(component:JTIComponent):JTChildPopUp
        {
            let count:number = this.__childs.length;
            let child:JTChildPopUp = null;
            for (let i:number = 0; i < count; i++)
            {
                let childPopUp:JTChildPopUp = this.__childs[i];
                if (childPopUp.component == component)
                {
                    let lines:JTChildPopUp[] = this.__childs.splice(i, 1);
                    child = lines.shift();
                }
            }
            return child;
        }

        public static get layer():fgui.GComponent
        {
            if (!this.__layer)
            {                
                let layerManager:JTLayerManager = JTApplicationBootstrap.getContext(JTApplicationBootstrap.LAYER);
                this.__layer = layerManager.getLayer(JTLayerManager.LAYER_POPUP);
            }
            return this.__layer;
        }

        private static _pool:JTIPool = null;
        private static create(component:JTIComponent, parent?:fgui.GComponent, isTween:boolean = false, mode:boolean = true):JTChildPopUp
        {
            var childPopUp:JTChildPopUp = this.pool.get() as JTChildPopUp;
            childPopUp.setup(component, parent, isTween, mode);
            return childPopUp;
        }

        private static put(childPopUp:JTChildPopUp):void
        {
            this.pool.put(childPopUp);
        }

        protected static get pool():JTIPool
        {
            if(!this._pool)
            {
                this._pool = JTPool.instance(JTChildPopUp);
            }
            return this._pool;
        }
    }
}
