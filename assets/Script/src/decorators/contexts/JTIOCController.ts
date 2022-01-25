///<reference path="base/JTDescripter.ts"/>
/*
* name;
*/
module com 
{
	export class JTIocController
	{
		public __annotationMap:{[className:string]:JTDescripter} = {};
		public __annotations:JTDescripter[] = [];

		public classification(__emt:JTElementDescripter):void
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


