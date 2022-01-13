

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
		 return function (target:any) 
		 {
			let component:any = target;
			//get 方法取代	component.__evtMap = {};
			let prototype:any = component.prototype;
			prototype.addEventListener(JTResizeEvent.RESIZE, prototype.onResize, target, once)
			// component.addEventListener = function (key:any, method:Function, caller:any, once?:boolean) //在注入时，cocos creator IDE 找不到该方法
			// {
			// 	let flag:Boolean = this.__evtMap[key];
			// 	if (!flag)
			// 	{
			// 			this.__evtMap[key] = method;
			// 			JTEventManager.addEventListener(key, method, caller, once);
			// 	}      
			// }
			// component.addEventListener (JTResizeEvent.RESIZE, component.onResize, target, once);
		 }
	 }
}



