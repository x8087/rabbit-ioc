

/*
* name;
*/
module com 
{
    /**
	 * 注入装饰器
	 * @param parameter 
	 * @param type JTTextLoader.LOAD_DEFAULT,{url:c:1.txt, JTConfigTemplate};
	 * 			   JTTextLoader.LOAD_PARSE {type:JTTextLoader.PARSE_ZIP | JTTextLoader.PARSE_BINARY | JTTextLoader.PARSE_STRING, data:content, JTConfigTemplate}; 
	 */
	export function Configuration(cls:Function, parameters:object):Function
    {
		return function (target:any, property:string, descripter?:any) 
        {
			if (descripter) 
            {
				//  injectGetterSetter(cls, target, property, descripter);
			}
			else 
            {
				 loadConfiguration(cls, target, property, parameters);
			}
		}
	}

	export function loadConfiguration(cls:any, target:any, property:string, parameters:any) 
	{
		let key:string = JTDecoratorUtils.registerDecoratorKey(property);
		Object.defineProperty(target, property, 
		{
			get: function () 
			{
				let val = this[key];
				if (val === null || val === undefined) 
				{
					let _class:JTClassInjectAlias = JTDecoratorUtils.bindTemplate(cls, parameters);
					val = this[property] = _class.instance;
					_class = null;
				}
				return val;
			},
			set: function (val) 
			{
				let oldVal:any = this[key];
				if (val === oldVal) return;
				this[key] = val;
			},
			enumerable: true,
			configurable: true
		});
	}
}



