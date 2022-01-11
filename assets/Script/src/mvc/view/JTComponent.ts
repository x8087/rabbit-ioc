namespace com 
{
    export abstract class JTComponent<T extends fgui.GComponent> extends JTEventSignaler implements JTIComponent
    {
        protected _componentUI:T = null;
        protected _runClass:any = null;
        protected _componentId:string = null;
        protected _url:string = null;
        private _registeredClick:boolean = false;
        constructor()
        {
            super();
        }

        protected loadAsset(url:string, id:string, runClass?:any, registeredClick:boolean = true):void
        {
            this._componentId = id;
            this._url = url;
            this._runClass = runClass;
            this._registeredClick = registeredClick;
            fgui.UIPackage.loadPackage(this._url, this.loadAssetComplete.bind(this));
        }

        protected loadAssetComplete():void
        {
            this._componentUI = fgui.UIPackage.createObject(this._url, this._componentId) as T;
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

        public get componentId():string
        {
            return this._componentId;
        }

        public get runClass():any
        {
            return this._runClass;
        }

    }
}
