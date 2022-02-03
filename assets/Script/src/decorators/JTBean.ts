module com 
{
    export class JTBean
    {
        public _class:any = null;
        public _descripter:any = null;
        public _instance:any = null;

        public _sourceProperty:string = null;
        public _changedProperty:string = null;

        constructor(paramaters?:any)
        {

        }

        public bind(caller:any, property:string, descripter:any):void
        {
            this._class = caller;
            this._descripter = descripter;
            this._changedProperty = this._sourceProperty = property;
        }

        public get instance():any
		{
			if (!this._instance) 
			{
                let __method:Function = this._descripter.value;
				this._instance = __method.apply(this._class, []);
			}
			return this._instance;
		}
    }
}