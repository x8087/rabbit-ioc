

/*
* name;
*/
module com 
{

    export class JTResizeEvent
    {
		public static RESIZE:string = "resize";
	}
	/**
	 * 自动适配
	 * 会根据窗口大小变化而变化
	 * @param once 是否只执行一次
	 * @returns 
	 */
	 export function Resize(once:boolean = false):Function
	 {
		 return function (target:any, property:string) 
		 {
			let signaler:JTIEventSignaler = target;
			signaler["injectEventMap"]();//由于装饰器注入的对象是单例时，此方法生效（装鉓器的对象有多个时，未测试）因为该对象并未实例化，装饰器
			signaler.addEventListener(JTResizeEvent.RESIZE, target[property], target, once);
		 }
	 }
}



