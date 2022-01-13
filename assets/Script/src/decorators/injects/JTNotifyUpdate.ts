

/*
* name;
*/
module com 
{
 
	/**
	 * 与JTResponse一样可能由于装饰器模式下，提前注入方法，所以使用项目的静态变量无法使用，没有扫描到
	 * 通知更新视图
	 * @param eventType 事件类型
	 * @returns 
	 */
	export function NotifyUpdate(eventType:string):Function
    {
		return function (target:any, property:string, descripter?:any) 
        {
				let signaler:JTEventSignaler = target;
				//get 方法取代	signaler.__evtMap = {};//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
				signaler.addEventListener(eventType, target[property], target);
		}
	}
}



