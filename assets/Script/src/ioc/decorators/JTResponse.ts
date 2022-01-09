

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
			// if ( typeof protocol  == 'string') //失败方法2和3
			// {
			// 	let index:number = protocol.indexOf(".");
			// 	if (index != -1)
			// 	{
			// 		let lines:string[] = protocol.split(".");
			// 	//	JTApplicationBootstrap.getObject(JTApplication.PROTOCOL_MANAGER);
					
			// 	}
			// }
				let signaler:JTEventSignaler = target;
				signaler["injectEventMap"]();//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
				signaler.registerFunction(protocol, target[property], target);
		}
	}
}



