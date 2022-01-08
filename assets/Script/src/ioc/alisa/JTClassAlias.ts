/*
* name;
*/
module com 
{
	export abstract class JTClassAlias
	{
		protected _cls:any = null;
		protected _instance:any = null;

		public static CLASS_NAME:string = "__ClassName";

		constructor(cls:any)
		{
			this._cls = cls;
		}

		public recycle() 
		{
			this._instance = this._cls = null;
		}

		public get instance():any
		{
			if (!this._instance) 
			{
				this._instance = new this._cls();
			}
			return this._instance;
		}
	}
}


