namespace com 
{
    export abstract class JTPanel<T extends fgui.GComponent> extends JTComponent<T>
    {
        constructor()
        {
            super();
        }

        public load(): void 
        {
            super.load();
            this.locker.lock();
        }

        public get locker():JTLocker
        {
            return JTPopupManager.locker;
        }
    }
}
