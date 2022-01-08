/*
* name;
*/
module com 
{
	export class JTDecoratorUtils 
	{
		private static _bindedMap:{[name:string] : JTClassAlias} = {};
		// private static _singletonMap:{[name:string] : JTClassAlisa} = {};

		public static DECORATOR_KEY:string = "__c.decorator__";
		/**
		 * 标记当前对象哪些属性进行了注入
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

		/**
		 * 全局单例--一个项目中只能存在一份实例（以cls做为参照对象）
		 * @param cls 
		 * @param destroyed 
		 * @returns 
		 */
		public static bind(cls:any, destroyed:boolean = false):JTClassAlias
		{
			let name:string = cls.name;
			let __class:JTClassAlias = this._bindedMap[name];
			if (!__class)
			{
				__class = new JTSingletonClassAlias(cls, destroyed);
				this._bindedMap[name] = __class;
			}
			return __class;
		}

		public static bindPool(poolCls:any, itemCls:any, destroyed:boolean = false):JTClassAlias
		{
			let name:string = itemCls.name;
			let __class:JTClassAlias = this._bindedMap[name];
			if (!__class)
			{
				__class = new JTSingletonPoolAlias(poolCls, itemCls, destroyed);
				this._bindedMap[name] = __class;
			}
			return __class;
		}

		public static getClassAlisa(cls:any):JTClassAlias
		{
			let name:string = cls.name;
			let __class:JTClassAlias = this._bindedMap[name];
			return __class;
		}
	}
}


