 
namespace com
{
export class JTUIComponent<T extends fgui.GComponent> extends fgui.GComponent implements JTIEventSignaler
   {

        protected _componentId:string = null;
        protected ____ui:T = null;
        protected _url:string = null;
        protected __runClass:any = null;
        protected __loaded:boolean = false;
        protected _signaler:JTEventSignaler = null;
        protected __uiPackage:fgui.UIPackage = null;
        protected _registeredClick:boolean = false;
        protected ___owner:JTIScene = null;
        public constructor()
        {
                super();
                this._signaler = JTEventSignaler.create();
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
                this.__loaded = false;
                this._url = url;
                this._componentId = __id;
                this.__runClass = runClass;
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

        public build(owner:JTIScene, __id:string, registeredClick:boolean = true, runClass?:any):void
        {
                this._componentId = __id;
                this.__runClass = runClass;
                this.___owner = owner;
                this.__uiPackage = this.___owner.uiPackage
                this._registeredClick = registeredClick;
                this.__runClass && this.__runClass.bindAll();
                this.createView();
        }

        protected createView():void
        {
                this.____ui = this.__uiPackage.createObject(this._componentId) as T;
                if (this._registeredClick) this.on(fgui.Event.UNDISPLAY, this.onRemoveFromeStage, this);
                this.addChild(this.____ui);
     
        }

        protected loadAssetComplete():void
        {
               this.__loaded = true;
               this.__runClass && this.__runClass.bindAll(); 
               this.__uiPackage = fgui.UIPackage.addPackage(this._url);
               this.createView();
        }

        protected onRemoveFromeStage(e):void
        {
                this.off(fgui.Event.UNDISPLAY, this.onRemoveFromeStage, this);
                this.removeChildren();
                this._signaler && JTEventSignaler.put(this._signaler);
                this.___owner = this._signaler = this.__runClass = this.____ui = this.__uiPackage = null;
        }

        public get componentUI():T
        {
                return this.____ui
        }

        recycle() 
        {
                this._signaler.recycle();
        }

        public addEventListener(key:any, method:Function, caller:any, once?:boolean):void
        {
                this._signaler.addEventListener(key, method, caller, once);
        }

        public dispatchEvent(key:any, args?:any):void
        {
                this._signaler.dispatchEvent(key, args);
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
