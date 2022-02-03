/*
* name;
*/
module com 
{
	export abstract class JTClassInjectAlias
	{
		protected _class:any = null;
		protected _instance:any = null;

		public static CLASS_NAME:string = "__ClassName";

		constructor(cls:any)
		{
			this._class = cls;
		}

		public recycle() 
		{
			this._instance = this._class = null;
		}

		public get instance():any
		{
			if (!this._instance) 
			{
				this._instance = new this._class();
			}
			return this._instance;
		}
	}
}


