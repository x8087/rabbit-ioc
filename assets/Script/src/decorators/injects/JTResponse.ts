

/*
* name;
*/
module com 
{
	/**
	 * 可能由于装饰器模式下，提前注入方法，所以使用项目的静态变量无法使用，没有扫描到
	 * 请求响应 只响应全局事件JTFunctionManager
	 * @param protocol 协议号，目前只支持长连接请求---WebSocket
	 * @returns 
	 */
	export function Response(protocol:number, waitingbar:boolean = true):Function
    {
		return function (target:any, property:string, descripter?:any) 
        {
			let signaler:JTEventSignaler = target;
			signaler["injectFunctionMap"]();//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
			signaler.registerFunction(protocol, target[property], target);
		}
	}

	/**
	 * 可能由于装饰器模式下，提前注入方法，所以使用项目的静态变量无法使用，没有扫描到
	 * 请求响应 只响应全局事件JTFunctionManager
	 * @param protocol 协议号，目前只支持长连接请求---WebSocket
	 * @returns 
	 */
	export function ResponseMapping(protocol:number, __dataCls:any, createFromPool:boolean = false, waitingbar:boolean = true):Function
	{
		return function (target:any, property:string, descripter?:any) 
		{
			let signaler:JTEventSignaler = target;
			signaler["injectFunctionMap"]();//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
			
			JTResponseMapping["mappingMap"][protocol] = new JTClassMapper(__dataCls, createFromPool); //注入MAPPER 映射
		 
			signaler.registerFunction(protocol, target[property], target);
		}
	}
}



