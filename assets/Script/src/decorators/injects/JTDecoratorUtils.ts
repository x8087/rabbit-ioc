/*
* name;
*/
module com 
{
	export class JTDecoratorUtils 
	{
		private static _bindedMap:{[name:string] : JTClassInjectAlias} = {};
		// private static _singletonMap:{[name:string] : JTClassAlisa} = {};

		public static DECORATOR_KEY:string = "__c.decorator__";

		public static registerDecoratorKey(__property:string):string
		{
			let key:string = this.DECORATOR_KEY + __property;
			return key;
		}


		/**
		 * 全局单例--一个项目中只能存在一份实例（以cls做为参照对象）
		 * @param cls 
		 * @param destroyed 
		 * @returns 
		 */
		public static bind(cls:any, destroyed:boolean = false):JTClassInjectAlias
		{
			let name:string = cls.name;
			let _class:JTClassInjectAlias = this._bindedMap[name];
			if (!_class)
			{
				_class = new JTSingletonClassAlias(cls, destroyed);
				this._bindedMap[name] = _class;
			}
			return _class;
		}

		public static bindPool(poolCls:any, itemCls:any, parameters?:any):JTClassInjectAlias
		{
			let name:string = itemCls.name;
			let _class:JTClassInjectAlias = this._bindedMap[name];
			if (!_class)
			{
				_class = new JTSingletonPoolAlias(poolCls, itemCls, parameters);
				this._bindedMap[name] = _class;
			}
			return _class;
		}

		public static bindTemplate(cls:any, parameters:any):JTClassInjectAlias
		{
			let name:string = cls.name;
			let _class:JTClassInjectAlias = this._bindedMap[name];
			if (!_class)
			{
				_class = new JTConfigurationAlisa(cls, parameters);
				this._bindedMap[name] = _class;
			}
			return _class;
		}

		public static getClassAlisa(cls:any):JTClassInjectAlias
		{
			let name:string = cls.name;
			let _class:JTClassInjectAlias = this._bindedMap[name];
			return _class;
		}
	}
}


