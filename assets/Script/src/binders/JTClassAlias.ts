/*
* name;
*/
module com 
{
	export class JTClassAlias implements JTIPoolObject
	{
		private _cls:any = null;
		private _instance:any = null;
		private _referenceMap:{[className:string]:string} = null;
		private _referenceCount:number = 0;
		private _destroyed:boolean = false;

		public static CLASS_NAME:string = "__ClassName";

		constructor(cls:any, destroyed:boolean = false)
		{
			this._cls = cls;
			this._destroyed = destroyed;
			this._referenceMap = {};
		}

		public recycle() 
		{
			
		}

		public bind(target:any, property:string):void
		{
			let __ClassName:string = target[JTClassAlias.CLASS_NAME];
			if (!__ClassName) target[JTClassAlias.CLASS_NAME] = target.name;
			if (!this._referenceMap[__ClassName])
			{
				this._referenceMap[__ClassName] = property;
			}
		}

		/**
		 * 建立引用关系
		 * @param target 引用的对象
		 * @param property 引用对象属性名
		 */
		public relevance():void
		{
			 
		}

		public get instance():any
		{
			if (!this._instance) 
			{
				this._instance = new this._cls();
			}
			return this._instance;
		}
	}
}


