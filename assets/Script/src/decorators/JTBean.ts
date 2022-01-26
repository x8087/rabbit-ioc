namespace com 
{
    export class JTBean
    {
        public ___caller:any = null;
        public ___descripter:any = null;
        public ___instance:any = null;

        public ___sourceProperty:string = null;
        public ___changedProperty:string = null;

        constructor(paramaters?:any)
        {

        }

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
			}
			return this.___instance;
		}
    }
}