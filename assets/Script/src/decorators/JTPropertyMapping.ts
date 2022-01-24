

/*
* 只是做一个属性名映射--全局的整个项目的一个属性名映射关系
*/
module com 
{
	export class JTPropertyMapping 
	{

		public static DECORATOR_KEY:string = "__c.decorator__";

		public static ___propertyMap:{[property:string]:string} = {};

		/**
		 * 标记当前对象哪些属性进行了注入
		 * @param cls 注入的类型
		 * @param target 注入的类
		 * @param __property 被注入的属性名
		 * @returns 返回注入关键字+属性名 __c.decorator__
		 */
		public static registerPropertyMapping(__property:string):void 
		{
			  this.___propertyMap[__property] = __property;
		 
		}

		public static changedPropertyMapping(__sourceProperty:string, __changedProperty:string):void
		{
			this.___propertyMap[__sourceProperty] = __changedProperty;
		}

		public static getProperty( __property:string):string
		{
			 
			return this.___propertyMap[__property];
		}
	}
}


