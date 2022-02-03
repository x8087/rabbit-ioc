/*
* 描述配置
*/
module com 
{
	export class JTConfigDescripter  implements JTIPoolObject
	{
		public _class:any = null;
		public _property:string = null;
		public _descripter:any = null;
		public parameters:any[] = null;

		public setup(__caller:any, property:string, descripter:any, parameters?:any[]):void
		{
			this._class = __caller;
			this._property = property;
			this._descripter = descripter;
			this.parameters = parameters;
		}

		public recycle() 
		{
			this.parameters.length = 0;
			this.parameters = this._descripter = this._property = this._class = null;
		}

		public getClass():any
		{
			let _cls:any = null;
			if (!this._property)
			{
				_cls = JTClassDescripter;
			}
			else
			{
				_cls = this._descripter ? JTMethodDescripter : JTPropertyDescripter;
			}
			return _cls
		}

		public changeParameters(__paremeters:any):void
		{	
				this.parameters = __paremeters;
		}

		private static _pool:JTIPool = null;

		private static get pool():JTIPool
		{
			if (!this._pool)
			{
				this._pool = JTPool.instance(JTConfigDescripter);
			}
			return this._pool;
		}

		public static create(target:any, property:string, descripter:any, parameters?:any[]):JTConfigDescripter
		{
			let config:JTConfigDescripter = this.pool.get() as JTConfigDescripter;
			config.setup(target, property, descripter, parameters);
			return config;
		}

		public static put(config:JTConfigDescripter):void
		{
			this.pool.put(config);
		}	
	}
}


