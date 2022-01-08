

/*
* name;
*/
module com 
{
    /**
	 * 注入装饰器
	 * @param cls 注入的单例类
	 * @param destroyed 是否销毁
	 */
	export function Singleton(cls:any, destroyed:boolean = false):Function
    {
		return function (target:any, propertyName:string, descripter?:any) 
        {
			if (descripter) 
            {
				//  injectGetterSetter(cls, target, propertyName, descripter);
			}
			else 
            {
				 injectSingleton(cls, target, propertyName, destroyed);
			}
		}
	}
	 
	export function injectSingleton(cls:Function, target:any, propertyName:string, destroyed:boolean) 
	{
		
	}
}



