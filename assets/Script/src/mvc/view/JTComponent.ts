namespace com 
{
    export abstract class JTComponent<T extends fgui.GComponent> extends JTEventSignaler implements JTIComponent
    {
        protected _componentUI:T = null;
        protected __runnableClass:any = null;
        protected _url:string = null;
        protected _pacakgeName:string = null;
        protected __classUI:T = null;
        protected _registeredClick:boolean = false;
        constructor()
        {
            super();
        }

        protected loadAsset(url:string, __class:any, runClass?:any, registeredClick:boolean = true):void
        {
            this._url = url;
            this.__classUI = __class
            this._pacakgeName = this._url.split("/").pop();
            this.__runnableClass = runClass;
            this._registeredClick = registeredClick;
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
            this.notifyComplete();
        }

        protected notifyComplete():void
        {
          
        }

        protected registerMouseClick(e):void
        {
            var target: fgui.GComponent = e.target["$gobj"]; //cocos 是$gobj Laya是$owner
            var targetName: string = target.name;
            if (!targetName) return;
            this.onMouseClickHandler(target, targetName);
        }
    
        protected onMouseClickHandler(target:fairygui.GComponent, targetName:string):void
        {
    
        }

        public get componentUI():T
        {
            return this._componentUI;
        }

        public get classUI():T
        {
            return this.__classUI;
        }

        public get runClass():any
        {
            return this.__runnableClass;
        }

    }
}
