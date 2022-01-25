///<reference path="JTIOCController.ts"/>
/*
* 
*/
module com 
{
	export class JTApplicationContext
	{
		public static controller:JTIocController = null;
		private static _launched:boolean = false;
		public static __elements:JTElementDescripter[] = [];

		public static collect(__c:any, runnable:Function,  property:string, descripter:any, parameters:any):boolean
		{
			if (this._launched) return false;
			let __e:JTElementDescripter = JTElementDescripter.create(__c, runnable, JTConfigDescripter.create(__c, property, descripter, parameters));
			this.__elements.push(__e);
			return true;
		}

		public static get launched():boolean
		{
			return this._launched;
		}

		private static classifiedMapping():void
		{
			let controller:JTIocController = new JTIocController()
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
			this.build();
			this.launch();
			return this;
		}

		private static build():void
		{
			this._launched = true;
			let controller:JTIocController = this.controller;
			controller.build();
		}

		private static launch():void
		{
			this._launched = true;
			let controller:JTIocController = this.controller;
			controller.run();
		}
	}
}


