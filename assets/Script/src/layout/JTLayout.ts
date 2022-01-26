module com 
{
    export class JTLayout
    {
        public static LAYOUT_VERTICAL:string = "Vertical";
        public static LAYOUT_HORIZONTAL:string = "Horizontal";
        public static LAYOUT_AUTO_SWITCH:string = "Auto-Switch";
        
        public __className:any = null;
        public __property:string = null;
        public __layout:string = null;
        constructor(_className:any, property:string, __layout:string)
        {
            this.settings(_className, property, __layout);
        }

        public settings(__className:any, property:string, __layout:string):void
        {
            this.__layout = __layout;
            this.__property = property;
            this.__className = __className;
        }

        public update(child:fgui.GComponent):void
        {
             switch(this.__layout)
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

      
    }
}