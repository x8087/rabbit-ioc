/*
* 
*/
module com 
{
	export class JTIocContainer
	{
		public __annotationMap:{[className:string]:JTDescripter} = {};
		public __annotations:JTDescripter[] = [];

		 public assemble(__emt:JTElementDescripter):void
		 {
			let __className:string = __emt.className;
			let __cls:any = __emt.getClassType;
			if (__cls == JTClassDescripter)
			{
				let __classDescripter:JTClassDescripter = this.__annotationMap[__className] as JTClassDescripter;
				if (!__classDescripter)	__classDescripter = new __cls(__emt.cls);
				__classDescripter.build(__emt);
			}
		 }
	 
	}
}