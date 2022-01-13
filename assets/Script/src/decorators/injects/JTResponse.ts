

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
		//get 方法取代	// signaler.__funMap = {};//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
			signaler.registerFunction(protocol, target[property], target);
		}
	}

	/**
	 *  
	 * 
	 * @param protocol 
	 * @returns 
	 */
	/**
	 * 请求响应 只响应全局事件JTFunctionManager
	 * @param protocol 协议号，目前只支持长连接请求---WebSocket
	 * @param __mapperClass 映射结果的数据Class类
	 * @param createFromPool true 是否由对象池创建，如果由对象池创建，当前函数执行完将自动清空回收，false 则由new 创建
	 * @param waitingbar 
	 * @returns 
	 */
	export function ResponseMapping(protocol:number, __mapperClass:any, createFromPool:boolean = false, waitingbar:boolean = true):Function
	{
		return function (target:any, property:string, descripter?:any) 
		{
			let signaler:JTEventSignaler = target;
				//get 方法取代// signaler.__funMap = {};//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
			JTAbstractResponseMapping["mappingMap"][protocol] = new JTClassMapper(__mapperClass, createFromPool); //注入MAPPER 映射
			signaler.registerFunction(protocol, target[property], target);
		}
	}
}



