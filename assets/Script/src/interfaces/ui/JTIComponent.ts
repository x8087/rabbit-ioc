

/*
* name;
*/
namespace com 
{
    export interface JTIComponent extends JTIEventSignaler
    {
        componentUI:fgui.GComponent;

        componentId:string;
        
        runClass:any;
    }
}