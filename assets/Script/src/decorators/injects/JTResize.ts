

/*
* name;
*/
module com 
{
    export class JTResizeEvent
    {
		public static RESIZE:string = "resize";

		private static ___classNames:any[] = []

		public static get className():string[]
		{
			return this.___classNames;
		}

		public static indexOf(___className:string):number
		{
			return this.___classNames.indexOf(___className);
		}

		public static registerResize(target:JTIComponent):void
		{
			let className:string = target.className;
			let index:number = JTResizeEvent.indexOf(className);
			if (index != -1)
			{
				target.addEventListener(JTResizeEvent.RESIZE, target.onResizeHandler, target);
			}
		}
	}
	/**
	 * 自动适配
	 * 会根据窗口大小变化而变化
	 * @param once 是否只执行一次
	 * @returns 
	 */
	 export function ResizeEvent():Function
	 {
		 return function (target:any) 
		 {
			JTResizeEvent.className.push(target.name);
		 }
	 }
}



