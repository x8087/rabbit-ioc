///<reference path="../events/JTEventSignaler.ts"/>
module com 
{
    export abstract class JTComponent<T extends fgui.GComponent> extends JTEventSignaler implements JTIComponent
    {
        protected _____ui:T = null;
        protected ___runClass:any = null;
        protected _url:string = null;
        protected _pacakgeName:string = null;
        protected __classUI:T = null;
        protected __componentId:string = null;
        protected _registeredClick:boolean = false;
        protected __loaded:boolean = false;
        protected __uiPackage:fgui.UIPackage = null;
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
            this.__loaded = false;
            this._url = url;
            this.__componentId = id;
            this._pacakgeName = this._url.split("/").pop();
            this.___runClass = runClass;
            this._registeredClick = registeredClick;
            this.__uiPackage = fgui.UIPackage.getByName(url);
            if (!this.__uiPackage)   this.load();
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
            if (!this.__loaded)
            {
                this.___runClass && this.___runClass.bindAll();
                this.__uiPackage = fgui.UIPackage.addPackage(this._url);
                this._____ui = this.getObject(this.__componentId);
                this._____ui.on(fgui.Event.UNDISPLAY, this.onRemoveFromStage, this)
                JTResizeEvent.registerResize(this);
                JTPopupManager.center(this._____ui);
                if (this._registeredClick)  this._____ui.onClick(this.registerMouseClick, this);
            }
            this.locker.release();
            this.__loaded = true;
            this.notifyComplete();
        }

        public bindUIRelation(parent:fgui.GComponent, type:number):void
        {
            this.bindRelation(this._____ui, parent, type);
        }

        public bindRelation(child:fgui.GComponent, parent:fgui.GComponent, type:number):void
        {
            child.setSize(parent.width, parent.height);
            child.addRelation(parent, type);
        }
        public getObject(id:string):T
        {
            let _____ui:T = this.__uiPackage.createObject(id) as T;
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

        public get uiPackage():fairygui.UIPackage
        {
            return this.__uiPackage;
        }

        protected onRemoveFromStage():void
        {
            this._____ui && this._____ui.off(fgui.Event.UNDISPLAY, this.onRemoveFromStage, this);
            if (this._registeredClick) this._____ui && this._____ui.offClick(this.onMouseClickHandler, this);
            this._pacakgeName = this.___runClass = this._url = 
            this.__classUI = this.__componentId = this.__uiPackage = this._____ui = null;
            this.recycle();
        }
    }
}
