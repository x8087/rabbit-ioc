/*
* name;
*/
module com 
{
	export abstract class JTClassInjectAlias
	{
		protected ___c:any = null;
		protected _instance:any = null;

		public static CLASS_NAME:string = "__ClassName";

		constructor(cls:any)
		{
			this.___c = cls;
		}

		public recycle() 
		{
			this._instance = this.___c = null;
		}

		public get instance():any
		{
			if (!this._instance) 
			{
				this._instance = new this.___c();
			}
			return this._instance;
		}
	}
}


