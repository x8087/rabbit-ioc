/*
* name;
*/
module com 
{
	export class JTDecoratorUtils 
	{
		private static _bindMap:{[name:string] : JTClassAlias} = {};


		public static DECORATOR_KEY:string = "__c.decorator__";
		/**
		 * 
		 * @param cls 注入的类型
		 * @param target 注入的类
		 * @param property 被注入的属性名
		 * @returns 返回注入关键字+属性名 __c.decorator__
		 */
		public static registerClassAlias(target:any, property:string):string 
		{
			 let __lines:string[] = target[this.DECORATOR_KEY];
			 if (!__lines)
			 {
				target[this.DECORATOR_KEY] = __lines = [];
			 }
			 __lines.push(property);
			let key:string = this.DECORATOR_KEY + property;
			return key;
		}

		public static bind(cls:any, destroyed:boolean = false):JTClassAlias
		{
			let name:string = cls.name;
			let __class:JTClassAlias = this._bindMap[name];
			if (!__class)
			{
				__class = new JTClassAlias(cls, destroyed);
				this._bindMap[name] = __class;
			}
			return __class;
		}

		public static getClassAlisa(cls:any):JTClassAlias
		{
			let name:string = cls.name;
			let __class:JTClassAlias = this._bindMap[name];
			return __class;
		}
	}
}


