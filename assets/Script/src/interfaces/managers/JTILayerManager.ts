

/*
* name;
*/
namespace com 
{
    export interface JTILayerManager
    {
         createLayer(type:string):fgui.GComponent 

         addToLayer(componentUI:fgui.GComponent, type:string):void

         getLayer(type:string):fgui.GComponent 
 
         stage:fgui.GRoot

    }
}