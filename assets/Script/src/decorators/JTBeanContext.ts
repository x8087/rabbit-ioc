namespace com 
{
    export class JTBeanContext
    {
        public ___class:any = null;
        public ___descripter:any = null;
        public ___caller:any = null;
        public ___instance:any = null;
        public ___sourceProperty:string = null;
        public ___changedProperty:string = null;

        public bind(caller:any, property:string, descripter:any):void
        {
            this.___caller = caller;
            this.___descripter = descripter;
            this.___changedProperty = this.___sourceProperty = property;
        }

        public get instance():any
		{
			if (!this.___instance) 
			{
                let __method:Function = this.___descripter.value;
				this.___instance = __method.apply(this.___caller, []);
                this.___class = this.___instance["constructor"];
			}
			return this.___instance;
		}
    }
}