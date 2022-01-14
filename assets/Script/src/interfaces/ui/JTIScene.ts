

/*
* name;
*/
namespace com 
{
    export interface JTIScene extends JTIComponent
    {
        getUIComponent<V extends fgui.GComponent>(___class:any, __id:string, registeredClick?:boolean, runClass?:any):JTUIComponent<V>
    }
}