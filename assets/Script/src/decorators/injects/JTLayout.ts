

/*
* name;
*/
module com 
{

	/**
	 * 自动适配
	 * 会根据窗口大小变化而变化
	 * @param once 是否只执行一次
	 * @returns 
	 */
	 export function Layout(layout:string):Function
	 {
		 return function (target:any, property:string, descripter?:any) 
		 {
			 if (!property) property = "layout";
			 JTLayoutManager.addLayout(target.name, property, layout);
		 }
	 }



	
}



