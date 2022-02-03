/*
* 描述元素 装饰器最小单位，一个属性或者方法、类有一个或者 多个装饰器代码;
*/
module com 
{
	export class JTElementDescripter implements JTIPoolObject
	{
		private _runnableMethod:Function = null;
		private _class:any = null;
		private _config:JTConfigDescripter = null;

		public relevance(cls:any, runnable:Function,  __config?:JTConfigDescripter):void
		{
			this._class = cls;
			this._runnableMethod = runnable;
			this._config = __config;
		}

		public get runnable():Function
		{
			return this._runnableMethod;
		}

		public run():void
		{
			this._runnableMethod &&  this._runnableMethod.apply(this._class, [this._config]);
		}

		public get config():JTConfigDescripter
		{
			return this._config;
		}

		public get parameters():any[]
		{
			return this._config.parameters;
		}

		public get className():string
		{		
			return this._class["constructor"].name;
		}

		public getClassContainer():any
		{
			return this._config.getClass();
		}

		public get property():string
		{
			return this._config._property;
		}

		public get cls()
		{
			return this._class;
		}

		public recycle() 
		{
			this._class = null;
			this._runnableMethod = null;
			let config:JTConfigDescripter = this._config;
			this._config = null;
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

		public static create(_class:any, runnable:Function, __config?:JTConfigDescripter):JTElementDescripter
		{
			let element:JTElementDescripter = this.pool.get() as JTElementDescripter;
			element.relevance(_class, runnable, __config);
			return element;
		}

		public static put(config:JTElementDescripter):void
		{
			this.pool.put(config);
		}	
	}
}


