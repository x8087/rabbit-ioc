///<reference path="JTIOCController.ts"/>
/*
* 
*/
module com 
{
	export class JTApplicationContext
	{
		public static __elements:JTElementDescripter[] = [];
		public static controller:JTIOCController = null;



		 public static collect(___cls:any, runnable:Function,  property:string, descripter:any, parameters:any):void
		 {
			let __e:JTElementDescripter = JTElementDescripter.create(___cls, runnable, parameters, JTConfigDescripter.create(___cls, property, descripter));
			this.__elements.push(__e);
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
			let controller:JTIOCController = this.controller;
			controller.execute();
		 }
	}
}


