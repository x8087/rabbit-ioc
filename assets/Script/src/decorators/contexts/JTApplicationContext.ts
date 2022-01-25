/*
* 
*/
module com 
{
	export class JTApplicationContext
	{
		 public static __elements:JTElementDescripter[] = [];




		 public static collect(___cls:any, type:string,  property:string, descripter:any, parameters:any):void
		 {
			let __e:JTElementDescripter = JTElementDescripter.create(___cls, type, parameters, JTConfigDescripter.create(___cls, property, descripter));
			this.__elements.push(__e);
		 }

		 private static classifiedMapping():void
		 {
			let totalCount:number = this.__elements.length;
			for (let i:number = 0; i < totalCount; i++)
			{
				let __e:JTElementDescripter = this.__elements[i];
				__e.className

			}
		 }

		 public static run(__class:any):JTApplicationContext
		 {
			 this.classifiedMapping();
				return this;
		 }
	}
}


