namespace com 
{
    export class JTChildPopUp implements JTIPoolObject
    {
 
        public component:JTIComponent = null;
        public parent:fgui.GComponent = null;
        public componentUI:fgui.GComponent = null;
        public isTween:boolean = false
        public mode:boolean = true

        public setup(component:JTIComponent, parent?:fgui.GComponent, isTween:boolean = false, mode:boolean = true):void
        {
            this.parent = parent;
            this.isTween = isTween;
            this.mode = mode;
            this.component = component;
        }

        public recycle():void
        {
            if (this.componentUI && this.componentUI.parent)
            {
                this.componentUI.removeFromParent();
            }
            this.parent = this.componentUI = this.component = null;
            this.mode = this.isTween = false;
        }
    }
}
