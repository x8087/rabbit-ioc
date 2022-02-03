 
module com
{
   export class JTUIComponent<T extends fgui.GComponent> extends fgui.GComponent implements JTIComponent
   {
        protected _componentId:string = null;
        protected _componentUI:T = null;
        protected _url:string = null;
        protected _runClass:any = null;
        protected _loaded:boolean = false;
        protected _signaler:JTEventSignaler = null;
        protected _uiPackage:fgui.UIPackage = null;
        protected _registeredClick:boolean = false;
        protected _owner:JTIScene = null;
        public constructor()
        {
                super();
                this._signaler = JTEventSignaler.create();
        }

        public get uiPackage():fgui.UIPackage
        {
                return this._uiPackage
        }

        public get runClass():any
        {
                return this._runClass;
        }

        /**
         * 场景中的一些小界面
         * @param url 
         * @param __id 
         * @param registeredClick 
         * @param runClass 
         * @returns 
         */
        protected loadAsset(url:string, __id:string, registeredClick:boolean = true, runClass?:any):void
        {
                if (this._url == url && url != null)
                {
                    info("asset already loaded");
                    return;
                }
                this._loaded = false;
                this._url = url;
                this._componentId = __id;
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

        public setup(owner:JTIScene, __id:string, registeredClick:boolean = true, runClass?:any):void
        {
                this._componentId = __id;
                this._runClass = runClass;
                this._owner = owner;
                this._uiPackage = this._owner.uiPackage
                this._registeredClick = registeredClick;
                this._runClass && this._runClass.bindAll();
                this.buildingUI();
        }

        protected buildingUI():void
        {
                this._componentUI = this._uiPackage.createObject(this._componentId) as T;
                this.on(fgui.Event.UNDISPLAY, this.onRemoveFromeStage, this);
                if (this._registeredClick)  this._componentUI.onClick(this.registerMouseClick, this);
                this.bindUIRelation(this, fgui.RelationType.Height);
                this.addChild(this._componentUI);
                JTResizeEvent.registerResize(this);
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

        protected loadAssetComplete():void
        {
               this._loaded = true;
               this._runClass && this._runClass.bindAll(); 
               this._uiPackage = fgui.UIPackage.addPackage(this._url);
               this.buildingUI();
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

        public onResizeHandler():void
        {
        //     if (!this.____ui) return;
        //     JTLayoutManager.update(this);
        }

        protected onRemoveFromeStage(e):void
        {
                this.off(fgui.Event.UNDISPLAY, this.onRemoveFromeStage, this);
                this.removeChildren();
                this._signaler && JTEventSignaler.put(this._signaler);
                this._owner = this._signaler = this._runClass = this._componentUI = this._uiPackage = null;
        }

        public get componentUI():T
        {
                return this._componentUI
        }

        recycle() 
        {
                this._signaler.recycle();
        }

        public get className():string
        {
            return this.constructor["name"];
        }


        public addEventListener(key:any, method:Function, caller:any, once?:boolean):void
        {
                this._signaler.addEventListener(key, method, caller, once);
        }

        public dispatchEvent(key:any, args?:any)
        {
               return this._signaler.dispatchEvent(key, args);//
        }

        public removeEventListener(key:any, method:Function, caller:any):void
        {
                this._signaler.removeEventListener(key, method, caller);
        }

        public removeEvents() 
        {
                this._signaler.removeEvents();
        }

        public registerFunction(key:any, method:Function, caller:any, once?:boolean):void
        {
                this._signaler.registerFunction(key, method, caller, once);
        }

        public execute(key:any, args?:any):void
        {
                this._signaler.execute(key, args);
        }

        public removeFunction(key:any, method:Function, caller:any):void
        {
                this._signaler.removeFunction(key, method, caller);
        }

        public removeFunctions() 
        {
                this._signaler.removeFunctions(); 
        }

    }
        
}
