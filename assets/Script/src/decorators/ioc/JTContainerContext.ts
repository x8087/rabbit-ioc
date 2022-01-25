
 

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

        public static collect(__c:any, property:string, descripter:any):void
        {
            let __context:JTBeanContext = this.___contextMap[property];
            if (__context)
            {
                error("already inject " + property  + " bean object. need change other property name!");
            }
            this.___contextMap[property] = __context = new JTBeanContext();
            __context.bind(__c, property, descripter);
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
                
                this.___contextMap[__sourceProperty] = null;
                delete this.___contextMap[__sourceProperty];
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

    export var Bean:Function = function(___c:any, property:string, descripter:any):void
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTContainerContext.collect(___c.__caller, ___c.__property, ___c.__descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Bean, property, descripter, [___c, property, descripter])
        }
        
    };

    /**
     * 
     * @param changedProperty 
     * @returns 
     */
    export var Qualifier:Function = function(changedProperty:any)
    {
        if (changedProperty instanceof JTConfigDescripter)
        {
            let __c:JTConfigDescripter = changedProperty;
            if (!__c.__descripter) //属性获取时，先修改对属性获取BEAN对象的属性名;
            {
                // Object.defineProperty(__c.__caller, __c.__property, {});
                doAutowired(__c.__caller, __c.__property, __c.parameters[0]);
            }
            else //方法或者类
            {
                JTContainerContext.changedPropertyName(__c.__property, __c.__descripter, __c.parameters[0]);
            }
        }
        else
        {
            var parameters:any = arguments;
            return function(___caller:any, __property:string, descripter:any)
            {
                JTApplicationContext.collect(___caller, Qualifier, __property, descripter, parameters)
            }
        }
    }

    export var Autowired:Function = function (__c:any, __property:string)
    {
        if (__c instanceof JTConfigDescripter)
        {
            let __parameters:any[] = __c.parameters;
            if (__parameters.length > 2)
            {
                doAutowired(__c.__caller, __c.__property, __parameters[2])
            }
            else
            {
                doAutowired(__c.__caller, __c.__property, __c.__property)
            }
        }
        else
        {
            JTApplicationContext.collect(__c, Autowired, __property, null, [__c, __property])
        }
    }
    
    function doAutowired(__caller:any, __property:string, changedProperty:string)
    {
        // let __descriptor:any = Object.getOwnPropertyDescriptor(__caller, __property)
        // if (__descriptor && __descriptor.value) return;//避免重复注册钩子
        let key:string = JTDecoratorUtils.registerDecoratorKey(__property);
		Object.defineProperty(__caller, __property, 
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

 

