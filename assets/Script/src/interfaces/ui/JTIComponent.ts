

/*
* name;
*/
namespace com 
{
    export interface JTIComponent<T extends fgui.GComponent>
    {
        componentUI:T;
        componentId:string;
        runCls:any;
        layerType:string;
    }
}