///<reference path="../events/JTEventSignaler.ts"/>
module com 
{
    export abstract class JTComponent<T extends fgui.GComponent> extends JTEventSignaler implements JTIComponent
    {
        protected _componentUI:T = null;
        protected _runClass:any = null;
        protected _url:string = null;
        protected _pacakgeName:string = null;
        protected _classUI:T = null;
        protected _componentId:string = null;
        protected _registeredClick:boolean = false;
        protected _loaded:boolean = false;
        protected _uiPackage:fgui.UIPackage = null;
        constructor()
        {
            super();
        }

        protected loadAsset(url:string, id:string, runClass?:any, registeredClick:boolean = true):void
        {
            if (this._url == url && url != null)
            {
                info("asset already loaded");
                return;
            }
            this._loaded = false;
            this._url = url;
            this._componentId = id;
            this._pacakgeName = this._url.split("/").pop();
            this._runClass = runClass;
            this._registeredClick = registeredClick;
            this._uiPackage = fgui.UIPackage.getByName(url);
            if (!this._uiPackage)   this.load();
            else
            {
                this.loadAssetComplete();
            }
        }

        public load():void
        {
            fgui.UIPackage.loadPackage(this._url, this.loadAssetComplete.bind(this));
        }

        protected loadAssetComplete():void
        {
            if (!this._loaded)
            {
                this._runClass && this._runClass.bindAll();
                this._uiPackage = fgui.UIPackage.addPackage(this._url);
                this._componentUI = this.getObject(this._componentId);
                this._componentUI.on(fgui.Event.UNDISPLAY, this.onRemoveFromStage, this)
                JTResizeEvent.registerResize(this);
                JTPopupManager.center(this._componentUI);
                if (this._registeredClick)  this._componentUI.onClick(this.registerMouseClick, this);
            }
            this.locker.unlock();
            this._loaded = true;
            this.notifyComplete();
        }

        public bindUIRelation(parent:fgui.GComponent, type:number):void
        {
            this.bindRelation(this._componentUI, parent, type);
        }

        public bindRelation(child:fgui.GComponent, parent:fgui.GComponent, type:number):void
        {
            child.setSize(parent.width, parent.height);
            child.addRelation(parent, type);
        }
        public getObject(id:string):T
        {
            let _____ui:T = this._uiPackage.createObject(id) as T;
            _____ui.setPosition(0, 0);
            return _____ui;
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

        public get className():string
        {
            return this.constructor["name"];
        }

        public onResizeHandler():void
        {
            // if (!this._____ui) return;
            // JTLayoutManager.update(this);
        }

        public get componentUI():T
        {
            return this._componentUI;
        }

        public get classUI():T
        {
            return this._classUI;
        }

        public get runClass():any
        {
            return this._runClass;
        }

        public get locker():JTLocker
        {
            return null;
        }

        public get uiPackage():fairygui.UIPackage
        {
            return this._uiPackage;
        }

        protected onRemoveFromStage():void
        {
            this._componentUI && this._componentUI.off(fgui.Event.UNDISPLAY, this.onRemoveFromStage, this);
            if (this._registeredClick) this._componentUI && this._componentUI.offClick(this.onMouseClickHandler, this);
            this._pacakgeName = this._runClass = this._url = 
            this._classUI = this._componentId = this._uiPackage = this._componentUI = null;
            this.recycle();
        }
    }
}
