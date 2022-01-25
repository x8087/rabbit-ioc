/*
* 描述元素 装饰器最小单位，一个属性或者方法、类有一个或者 多个装饰器代码;
*/
module com 
{
	export class JTElementDescripter implements JTIPoolObject
	{
		private __runable:Function = null;
		private ___c:any = null;
		private __config:JTConfigDescripter = null;

		public relevance(__caller:any, runable:Function,  __config?:JTConfigDescripter):void
		{
			this.___c = __caller;
			this.__runable = runable;
			this.__config = __config;
		}

		public get runnable():Function
		{
			return this.__runable;
		}

		public run():void
		{
			this.__runable &&  this.__runable.apply(this.___c, [this.__config]);
		}

		public get config():JTConfigDescripter
		{
			return this.__config;
		}

		public get parameters():any[]
		{
			return this.__config.parameters;
		}

		public get className():string
		{		
			return this.___c["constructor"].name;
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
			return this.___c;
		}

		public recycle() 
		{
			this.___c = null;
			this.__runable = null;
			let config:JTConfigDescripter = this.__config;
			this.__config = null;
			config && JTConfigDescripter.put(config);
			config = null;
		}

		private static _pool:JTIPool = null;

		private static get pool():JTIPool
		{
			if (!this._pool)
			{
				this._pool = JTPool.instance(JTElementDescripter);
			}
			return this._pool;
		}

		public static create(___caller:any, runnable:Function, __config?:JTConfigDescripter):JTElementDescripter
		{
			let element:JTElementDescripter = this.pool.get() as JTElementDescripter;
			element.relevance(___caller, runnable, __config);
			return element;
		}

		public static put(config:JTElementDescripter):void
		{
			this.pool.put(config);
		}	
	}
}


