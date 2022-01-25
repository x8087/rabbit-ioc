/*
* 描述元素 装饰器最小单位，一个属性或者方法、类有一个或者 多个装饰器代码;
*/
module com 
{
	export class JTElementDescripter
	{
		private _type:string = null;
		private __class:any = null;
		private __config:JTConfigDescripter = null;
		private _parameter:{[name:string]:any} = null;


		public relevance(__class:any, annotationType:string, parameters:any, __config?:JTConfigDescripter):void
		{
			this.__class = __class;
			this._type = annotationType;
			this._parameter = parameters;
			this.__config = __config;
		}

		public get className():string
		{		
			return this.__class["constructor"].name;
		}

		public getClassContainer():any
		{
			return this.__config.getClassContainer();
		}

		public get property():string
		{
			return this.__config.__property;
		}

		public get cls()
		{
			return this.__class;
		}

		public static create(__class:any, annotationType:string, parameters:any, __config?:JTConfigDescripter):JTElementDescripter
		{
			let element:JTElementDescripter = new JTElementDescripter();
			element.relevance(__class, annotationType, parameters, __config);
			return element;
		}
	}
}


