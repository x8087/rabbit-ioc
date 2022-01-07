

/*
* name;
*/
module com 
{
    /**
	 * 注入装饰器
	 * @param ctr 
	 */
	export function inject(controller: Function | string) 
    {
		return function (target: any, attrName: string, descripter?: any) 
        {
			if (descripter) 
            {
				injectGetterSetter(controller, target, attrName, descripter);
			}
			else 
            {
				//  doInjectAttr(controller, target, attrName);
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
	export function injectGetterSetter(key:any, target:any, attrName: string, descripter: any) 
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
	 
}