/*
* 描述配置
*/
module com 
{
	export class JTConfigDescripter
	{
		public __class:any = null;
		public __property:string = null;
		public __descripter:any = null;

		constructor(___c:any, property:string, descripter:any)
		{
			this.__class = ___c;
			this.__property = property;
			this.__descripter = descripter;
		}

		public getClassContainer():any
		{
			let _____c:any = null;
			if (!this.__property)
			{
				_____c = JTClassDescripter;
			}
			else
			{
				_____c = this.__descripter ? JTMethodDescripter : JTPropertyDescripter;
			}
			return _____c
		}

		public static create(target:any, property:string, descripter:any):JTConfigDescripter
		{
			return new JTConfigDescripter(target, property, descripter);
		}
	}
}


