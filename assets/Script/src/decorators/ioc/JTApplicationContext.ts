///<reference path="JTIOCController.ts"/>
/*
* 
*/
module com 
{
	export class JTApplicationContext
	{
		public static controller:JTIOCController = null;
		private static _launched:boolean = false;
		public static __elements:JTElementDescripter[] = [];

		public static collect(___cls:any, runnable:Function,  property:string, descripter:any, parameters:any):boolean
		{
			if (this._launched) return false;
			let __e:JTElementDescripter = JTElementDescripter.create(___cls, runnable, parameters, JTConfigDescripter.create(___cls, property, descripter));
			this.__elements.push(__e);
			return true;
		}

		public static get launched():boolean
		{
			return this._launched;
		}

		private static classifiedMapping():void
		{
			let controller:JTIOCController = new JTIOCController()
			let totalCount:number = this.__elements.length;
			for (let i:number = 0; i < totalCount; i++)
			{
				let __e:JTElementDescripter = this.__elements[i];
				controller.makeClassMap(__e);
			}
			this.controller = controller;
		}

		public static run(__class:any):JTApplicationContext
		{
			this.classifiedMapping();
			this.launch();
			return this;
		}

		private static launch():void
		{
			this._launched = true;
			let controller:JTIOCController = this.controller;
			controller.run();
		}
	}
}


