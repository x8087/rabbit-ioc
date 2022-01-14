

/*
* name;
*/
namespace com 
{
    export interface JTIComponent extends JTIEventSignaler
    {
        componentUI:fgui.GComponent;

        classUI:any;
        
        runClass:any;

        uiPackage:fgui.UIPackage;

        getObject(id:string):fgui.GComponent;

    }
}