namespace com 
{
    export class JTClassContext
    {
        public ___class:any = null;
        public ___descripter:any = null;
        public ___sourceProperty:string = null;
        public __changedProperty:string = null;
        public _instance:any = null;
        public ___caller:any = null;

        public bind(caller:any, property:string, descripter:any):void
        {
            this.___caller = caller;
            this.___descripter = descripter;
            this.__changedProperty = this.___sourceProperty = property;
        }

        public get instance():any
		{
			if (!this._instance) 
			{
                let __method:Function = this.___descripter.value;
				this._instance = __method.apply(this.___caller, []);
                this.___class = this._instance["constructor"];
			}
			return this._instance;
		}
    }
}