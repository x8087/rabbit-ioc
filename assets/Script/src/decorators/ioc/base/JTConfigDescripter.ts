/*
* 描述配置
*/
module com 
{
	export class JTConfigDescripter  implements JTIPoolObject
	{
		public __caller:any = null;
		public __property:string = null;
		public __descripter:any = null;
		public parameters:any[] = null;

		public setup(__caller:any, property:string, descripter:any, parameters?:any[]):void
		{
			this.__caller = __caller;
			this.__property = property;
			this.__descripter = descripter;
			this.parameters = parameters;
		}

		public recycle() 
		{
			this.parameters.length = 0;
			this.parameters = this.__descripter = this.__property = this.__caller = null;
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


