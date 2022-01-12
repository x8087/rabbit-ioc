namespace com 
{
    export abstract class JTScene<T extends fgui.GComponent> extends JTComponent<T>
    {
        constructor()
        {
            super();
        }

        public load()
        {   
            fgui.UIPackage.loadPackage(this._url, this.loadAssetComplete.bind(this));
        }

        protected loadAssetComplete():void
        {
            fgui.UIPackage.addPackage(this._url);
            this.__runnableClass.bindAll();
            this._componentUI = this.__classUI["createInstance"]();
            this._componentUI.makeFullScreen();
            JTPopupManager.center(this._componentUI);
            if (this._registeredClick)  this._componentUI.onClick(this.registerMouseClick, this);
            JTAbstractSceneManager.locker.release();
            this.notifyComplete();
        }
     
    }
}
