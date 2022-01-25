 

namespace com 
{
    export class JTContainerContext
    {
        public static ___contextMap:Object = {};
        public static ___contexts:JTBeanContext[] = [];

        protected getObjectByClass(___class:any):JTBeanContext
        {
            return null;
        }

        public static collect(caller:any, property:string, descripter:any):void
        {
            let __context:JTBeanContext = this.___contextMap[property];
            if (__context)
            {
                error("already inject " + property  + " bean object. need change other property name!");
            }
            this.___contextMap[property] = __context = new JTBeanContext();
            __context.bind(caller, property, descripter);
        }

        public static getContext(property:string):JTBeanContext
        {
            return this.___contextMap[property];
        }

        public static changedPropertyName(__sourceProperty:string, descripter:any, __changedProperty:string):void
        {
            let  ___c:JTBeanContext = null;
            for (let key in this.___contextMap)
            {
                ___c = this.___contextMap[key];
                if (___c.___descripter !== descripter) continue;
                ___c.___changedProperty = __changedProperty;
                this.___contextMap[__changedProperty] = ___c;
                
                delete this.___contextMap[__sourceProperty];
                this.___contextMap[__sourceProperty] = null;
                break;
            }
        }

        public bind():void
        {

        }

        public registerContext():void
        {
         
        }
    }

    export var Bean:Function = function(caller:any, property:string, descripter:any):void
    {
        if (!JTApplicationContext.collect(caller, Bean, property, descripter, [caller, property, descripter]))
        {
            JTContainerContext.collect(caller, property, descripter);
        }
    };

    export var Qualifier:Function = function(changedProperty:string)
    {
        var parameters:any = arguments;
        return function(___caller:any, __property:string, descripter:any)
        {
            if (!JTApplicationContext.collect(___caller, Qualifier, __property, descripter, parameters))
            {
                if (!descripter) //属性获取时，先修改对属性获取BEAN对象的属性名;
                {
                    Object.defineProperty(___caller, __property, {});
                    doAutowired(___caller, __property, changedProperty);
                }
                else //方法或者类
                {
                    JTContainerContext.changedPropertyName(__property, descripter, changedProperty);
                }
            }
        }
    }

    export var Autowired:Function = function (___caller:any, __property:string)
    {
        if (!JTApplicationContext.collect(___caller, Autowired, __property, {}, [___caller, __property]))
        {
            doAutowired(___caller, __property, __property)
        }
    }
    
    function doAutowired(___caller:any, __property:string, changedProperty:string)
    {
        // let __descriptor:any = Object.getOwnPropertyDescriptor(___caller, __property)
        // if (__descriptor) return;//避免重复注册钩子
        let key:string = JTDecoratorUtils.registerDecoratorKey(__property);
		Object.defineProperty(___caller, __property, 
		{
			get: function () 
			{
				let val = this[key];
				if (val === null || val === undefined) 
				{
					let ____c:JTBeanContext = JTContainerContext.getContext(changedProperty);
					val = this[__property] = ____c.instance;
					____c = null;
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

