namespace com 
{
    export abstract class JTScene<T extends fgui.GComponent> extends JTComponent<T> implements JTIScene
    {
        constructor()
        {
            super();
        }

        public get locker():JTLocker
        {
            return JTAbstractSceneManager.locker;
        }

        public getUIComponent<V extends fgui.GComponent>(___class:any, __id:string, registeredClick:boolean = true, runClass?:any):JTUIComponent<V>
        {
            let uiComponent:JTUIComponent<V> = new ___class();
            uiComponent.setup(this, __id, registeredClick, runClass);
            return uiComponent;
        }
    }
}
