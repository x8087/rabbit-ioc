///<reference path="base/JTDescripter.ts"/>
/*
* name;
*/
module com 
{
	export class JTClassDescripter extends JTDescripter
	{
		public __propertys:JTDescripter[] = null;//属性描述列表
		public __methods:JTDescripter[] = null;//方法描述列表

		constructor(__class:any)
		{
			super(__class);
			this.__methods = [];
			this.__propertys = [];
		}

		public build(__emt:JTElementDescripter):void
        {
			 
        }

		public getNameByClass(__c:any):string
		{		
			return __c["constructor"].name;
		}
	}
}


