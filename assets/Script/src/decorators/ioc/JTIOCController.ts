/*
* name;
*/
module com 
{
	export class JTIOCController
	{

		public __annotationMap:{[className:string]:JTDescripter} = {};
		public __annotations:JTDescripter[] = [];

		constructor()
		{
			
		}

		public run():void
		{
			let lines:JTDescripter[] = this.__annotations;
			for (let i:number = 0; i < lines.length; i++)
			{
				let descripter:JTDescripter = lines[i] as JTDescripter;
				descripter.run();
			}
		}

		public makeClassMap(__emt:JTElementDescripter):void
		{
			let __className:string = __emt.className;
			let __classDescripter:JTClassDescripter = this.__annotationMap[__className] as JTClassDescripter;
			if (!__classDescripter)
			{
				__classDescripter = new JTClassDescripter(__emt.cls);
				this.__annotationMap[__className] = __classDescripter
				this.__annotations.push(__classDescripter);
			}
			__classDescripter.assemble(__emt);
		}
	}
}


