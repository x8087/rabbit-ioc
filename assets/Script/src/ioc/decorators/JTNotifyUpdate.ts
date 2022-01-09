

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
				let dispatcher:JTEventDispatcher = target;
				dispatcher.addEventListener(eventType, target[property], target);
		}
	}
}



