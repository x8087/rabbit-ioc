 

namespace com 
{
    export class JTApplicationContext
    {
        public static ____contextMap:Object = {};
        public static ___contexts:JTClassContext[] = [];

        protected getObjectByClass(___class:any):any
        {

        }

        public static collect(caller:any, property:string, descripter:any):void
        {
            let __cxt:JTClassContext = this.____contextMap[property];
            if (__cxt)
            {
                error("already inject " + property  + " bean object. need change other property name!");
            }
            this.____contextMap[property] = __cxt = new JTClassContext();
            __cxt.bind(caller, property, descripter);
        }

        public static getContext(property:string):JTClassContext
        {
            let __changedProperty:string = JTPropertyMapping.getProperty(property);
            return this.____contextMap[__changedProperty];
        }

        public static changedPropertyName(caller:any, __sourceProperty:string, descripter:any, __changedProperty:string):void
        {
            let  ___c:JTClassContext = null;
            for (let key in this.____contextMap)
            {
                ___c = this.____contextMap[key];
                if (___c.___descripter !== descripter) continue;
                ___c.__changedProperty = __changedProperty;
                this.____contextMap[__changedProperty] = ___c;
                
                delete this.____contextMap[__sourceProperty];
                this.____contextMap[__sourceProperty] = null;
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
        if (!descripter)
        {
           JTLogger.error("inject Bean Object is error, only use method!")
           return;
        }
        JTApplicationContext.collect(caller, property, descripter);
        JTPropertyMapping.registerPropertyMapping(property);
    };

    export var Qualifier:Function = function(changedProperty:string)
    {
        return function(caller:any, sourceProperty:string, descripter:any)
        {
            if (!descripter) //属性获取时，先修改对属性获取BEAN对象的属性名;
            {
               
            }
            else //方法或者类
            {
                JTApplicationContext.changedPropertyName(caller, sourceProperty, descripter, changedProperty);
                JTPropertyMapping.changedPropertyMapping(sourceProperty, changedProperty);
            }
        }
    }

    export var Autowired:Function = function (___caller:any, __property:string)
    {
        let __descriptor:any = Object.getOwnPropertyDescriptor(___caller, __property)
        if (__descriptor) return;//避免重复注册钩子
        let key:string = JTDecoratorUtils.registerDecoratorKey(__property);
		Object.defineProperty(___caller, __property, 
		{
			get: function () 
			{
				let val = this[key];
				if (val === null || val === undefined) 
				{
					let ____c:JTClassContext = JTApplicationContext.getContext( __property);
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

