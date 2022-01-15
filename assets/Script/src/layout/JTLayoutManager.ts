namespace com 
{
    export class JTLayoutManager extends JTApplicationContext
    {

        public static ___classLayoutMap:{[className:string] : {[name:string]:JTLayout}} = {}
        private _stage:fgui.GRoot = null;
        public static currentLayout:string = null;

        constructor()
        {
            super();
        }

        public static addLayout(__className:string, property:string, __layout:string):void
        {
            let __layoutMap:{[name:string]:JTLayout} = this.___classLayoutMap[__className];
            if (!__layoutMap)
            {
                    this.___classLayoutMap[__className] = __layoutMap = {};
            }
            let layout:JTLayout = __layoutMap[property];
            if (layout) return;
            layout = new JTLayout(__className, property, __layout);
            __layoutMap[property] = layout;
        }

        public static update(view:JTIComponent):void
        {
            let className:string = view.className;
            let __layoutMap:{[name:string]:JTLayout} = this.___classLayoutMap[className];
            if (!__layoutMap) 
            {
                JTLayoutManager.layoutUpdate(view.componentUI, JTLayout.LAYOUT_VERTICAL);
                return;
            }
            for (var key in __layoutMap)
            {
                let layout:JTLayout = __layoutMap[key];
                if (key == "layout") 
                {
                    if (view instanceof JTUIComponent)   layout.update(view);
                    else 
                    {
                        layout.update(view.componentUI)
                    }
                }
                else
                {
                    layout.update(view.componentUI[layout.__property])
                }
            }
        }

        public static getLayout(___className:string, property?:string):JTLayout
        {
            let __layoutMap:{[name:string]:JTLayout} = this.___classLayoutMap[___className];
            if (__layoutMap)
            {
                if (!property) property = "layout";
                return __layoutMap[property];
            }
            return null;
        }

        
        public static layoutUpdate(child:fgui.GComponent, layout:string):void
        {
             switch(layout)
             {
                case JTLayout.LAYOUT_VERTICAL:
                {
                    JTLayoutManager.layoutVertical(child);
                    break;
                }
                case JTLayout.LAYOUT_HORIZONTAL:
                {
                    JTLayoutManager.layoutHorzontal(child);
                    break;
                }
                case JTLayout.LAYOUT_AUTO_SWITCH:
                {
                    JTLayoutManager.autoAdjustLayout(child);
                    break;
                }
             }
        }

        public static layoutVertical(child:fgui.GComponent):void
        {
            let parent:fgui.GComponent = child.findParent() as fgui.GComponent;
            if (!parent) return;
            child.setSize(parent.width, parent.height);
            child.addRelation(parent, fgui.RelationType.Height);
        }

        public static layoutHorzontal(child:fgui.GComponent):void
        {
            let parent:fgui.GComponent = child.findParent() as fgui.GComponent;
            if (!parent) return;
            child.setSize(parent.width, parent.height);
            child.addRelation(parent, fgui.RelationType.Width);
        }

        public static autoAdjustLayout(child:fgui.GComponent):void
        {
            let parent:fgui.GComponent = child.findParent() as fgui.GComponent;
            if (!parent) return;
            child.setSize(parent.width, parent.height);
            child.addRelation(parent, fgui.RelationType.Size);
        }

        public build():void 
        {
            this._stage = JTSession.stage;
            this.registerWindowResize();
        }

        protected registerWindowResize():void
        {
            window.addEventListener("resize", this.onResize.bind(this));
        }

        protected onResize(e):void
        {
            this.update();
            dispatchEvent(JTResizeEvent.RESIZE);
        }

        protected update():void
        {
            JTSession.stageWidth = this._stage.width;
            JTSession.stageHeight = this._stage.height;
        }

        public buildComplete():void 
        {
           
        }
        
    }
}