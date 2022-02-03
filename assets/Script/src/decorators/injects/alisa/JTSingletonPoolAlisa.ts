/*
* name;
*/
module com 
{
	export class JTSingletonPoolAlias extends JTClassInjectAlias
	{
		private _referenceMap:{[className:string]:string} = null;
		private _referenceCount:number = 0;
		private _parameters:any = false;
		private _itemCls:any = null;

		constructor(cls:any, itemCls:any, parameters?:any)
		{
			super(cls);
			this._itemCls = itemCls;
			this._referenceMap = {};
			this._parameters = parameters;
		}

		public recycle() 
		{
			super.recycle();
		}

		// public bind(target:any, property:string):void
		// {
		// 	let __ClassName:string = target[JTSingletonClass.CLASS_NAME];
		// 	if (!__ClassName) target[JTSingletonClass.CLASS_NAME] = target.name;
		// 	if (!this._referenceMap[__ClassName])
		// 	{
		// 		this._referenceMap[__ClassName] = property;
		// 	}
		// }

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
				this._instance = this._class.instance(this._itemCls, this._parameters);
			}
			return this._instance;
		}
	}
}


