

/*
* name;
*/
module com 
{
    /**
	 * 注入装饰器
	 * @param poolCls
	 * @param itemCls 注入的单例类
	 * @param destroyed 引用计数为0时，是否自动销毁
	 */
	export function SingletonPool(poolCls:any, itemCls:any, destroyed:boolean = false):Function
    {
		return function (target:any, property:string, descripter?:any) 
        {
			if (descripter) 
            {
				//  injectGetterSetter(cls, target, propertyName, descripter);
			}
			else 
            {
				 registerSingletonPoolAlisa(poolCls, target, property, itemCls, destroyed);
			}
		}
	}
	 
	export function registerSingletonPoolAlisa(poolCls:any, target:any, property:string, itemCls:any, destroyed:boolean = false) 
	{
		let key:string = JTDecoratorUtils.registerClassAlias(target, property);
		Object.defineProperty(target, property, 
		{
			get: function () 
			{
				let val = this[key];
				if (val === null || val === undefined) 
				{
					let _class:JTClassAlias = JTDecoratorUtils.bindPool(poolCls, itemCls, destroyed);
					val = this[property] = _class.instance;
					_class = null;
				}
				return val;
			},
			set: function (val) 
			{
				let oldVal:any = this[key];
				if (val === oldVal) return;
				this[key] = val;
			},
			enumerable: true,
			configurable: true
		});
	}
}



