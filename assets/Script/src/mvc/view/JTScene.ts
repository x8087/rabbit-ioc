namespace com 
{
    export abstract class JTScene<T extends fgui.GComponent> extends JTComponent<T>
    {
        constructor()
        {
            super();
        }

        public get locker():JTLocker
        {
            return JTAbstractSceneManager.locker;
        }
    }
}
