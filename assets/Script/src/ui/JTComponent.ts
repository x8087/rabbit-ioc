namespace com 
{
    export class JTComponent<T extends fgui.GComponent> extends JTEventSignaler implements JTIComponent<T>
    {
        protected _componentUI:T = null;
        protected _componentId:string = null;
        protected _runCls:any = null;
        protected _layerType:string = null;

        
        constructor()
        {
            super();
        }

        public get componentUI():T
        {
            return this._componentUI;
        }

        public get componentId():string
        {
            return this._componentId;
        }

        public get runCls():any
        {
            return this._runCls;
        }

        public get layerType():string
        {
            return this._layerType;
        }
    }
}
