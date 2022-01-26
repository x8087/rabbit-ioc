

/*
* name;
*/
module com 
{
    export interface JTIComponent extends JTIEventSignaler
    {
        componentUI:fgui.GComponent;

        runClass:any;

        uiPackage:fgui.UIPackage;

        className:string;

        bindUIRelation(parent:fgui.GComponent, type:number):void;

        bindRelation(child:fgui.GComponent, parent:fgui.GComponent, type:number):void;

        onResizeHandler(e:any):void;
    }
}