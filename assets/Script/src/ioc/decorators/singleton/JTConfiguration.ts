

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
				 injectGetterSetter(cls, target, property, descripter);
			}
			else 
            {
				 loadConfiguration(cls, target, property, parameters);
			}
		}
	}

    /**
	 * 对getter/setter方法进行注入
	 * @param key 
	 * @param taget 
	 * @param attrName 
	 * @param descripter 
	 */
	export function injectGetterSetter(parameter:any, target:any, propertyName:string, descripter:any) 
    {
	// 	let k: string = injectionAttrKey + attrName;
	// 	// 注册需要注入的属性名/存取器器名
	// 	InjectionBinder.instance.registerInjection(target, attrName);
	// 	descripter.get = function () 
    //     {
	// 		let v = this[k];
	// 		if (v === null || v === undefined) 
    //         {
	// 			let info:InjectionBindInfo = InjectionBinder.instance.bind(key);
	// 			v = this[attrName] = info.getInstance();
	// 			info = null;
	// 		}
	// 		return v;
	// 	};
	// 	descripter.set = function (v) 
    //     {
	// 		// 先将新值引用计数+1
	// 		// 如果先减旧值计数，可能触发其析构
	// 		if (v) 
    //         {
	// 			addRefCount(v)
	// 		}

	// 		// 再将原来的值的引用计数-1
	// 		let oldV = this[k];
	// 		if (oldV) 
    //         {
	// 			addRefCount(oldV, -1);
	// 		}

	// 		this[k] = v;
	// 	}
	// }
    }
	 
	export function loadConfiguration(parameter:string | Function, target: any, propertyName:string, data:any) 
	{
		
	}
}



