namespace com 
{
    export abstract class JTComponent<T extends fgui.GComponent> extends JTEventSignaler implements JTIComponent
    {
        protected _____ui:T = null;
        protected ___runClass:any = null;
        protected _url:string = null;
        protected _pacakgeName:string = null;
        protected __classUI:T = null;
        protected _registeredClick:boolean = false;
        protected __loaded:boolean = false;
        constructor()
        {
            super();
        }

        protected loadAsset(url:string, __class:any, runClass?:any, registeredClick:boolean = true):void
        {
            this._url = url;
            this.__classUI = __class
            this._pacakgeName = this._url.split("/").pop();
            this.___runClass = runClass;
            this._registeredClick = registeredClick;
            if (!this.__loaded)   this.load();
            else
            {
                this.loadAssetComplete();
            }
        }

        public load():void
        {
            this.___runClass && this.___runClass.bindAll();
            fgui.UIPackage.loadPackage(this._url, this.loadAssetComplete.bind(this));
        }

        protected loadAssetComplete():void
        {
            fgui.UIPackage.addPackage(this._url);
            this._____ui = this.__classUI["createInstance"]();
            this._____ui.x = this._____ui.y = 0;
            this._____ui.makeFullScreen();
            JTPopupManager.center(this._____ui);
            if (this._registeredClick)  this._____ui.onClick(this.registerMouseClick, this);
            if (!this.__loaded)this.locker.release();
            this.__loaded = true;
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
            return this._____ui;
        }

        public get classUI():T
        {
            return this.__classUI;
        }

        public get runClass():any
        {
            return this.___runClass;
        }

        public get locker():JTLocker
        {
            return null;
        }

    }
}
