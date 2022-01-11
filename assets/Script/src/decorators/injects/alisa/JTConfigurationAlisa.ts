/*
* name;
*/
module com 
{
	export class JTConfigurationAlisa extends JTClassAlias
	{
		private _referenceMap:{[className:string]:string} = null;
		private _referenceCount:number = 0;
		private _destroyed:boolean = false;
		private _parameter:any = null;

		constructor(cls:any, parameters:any)
		{
			super(cls);
			this._parameter = parameters;
			this._referenceMap = {};
		}

		public recycle() 
		{
			super.recycle();
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
				let loader:JTTextLoader = this._instance = new JTTextLoader();
				let loadedType:string = this._parameter["type"];
				if (loadedType == JTTextLoader.LOAD_DEFAULT)
				{
							//暂未实现
				}
				else if (loadedType == JTTextLoader.LOADED_PARSE) //已经加载完成，仅解析数据
				{
					let name:string = this._parameter["name"];
					let templateManager:JTTemplateBaseManager =  JTApplicationBootstrap.getContext(JTApplicationBootstrap.TEMPLATE);
					let data:any = templateManager.getValue(name);
					let type:string = this._parameter["parseType"];
					switch(type)
					{
						case JTTextLoader.PARSE_BINARY:
						{
							loader.parseBinary(data, this._cls);
							break;
						}
						case JTTextLoader.PARSE_STRING:
						{
							loader.parseStr(data, this._cls);
							break;
						}
						case JTTextLoader.PARSE_ZIP:
						{
							loader.parseZip(data, this._cls);
							break;
						}
					}
				}
			}
			return this._instance;
		}
	}
}


