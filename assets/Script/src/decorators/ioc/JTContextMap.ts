///<reference path="../../common/JTDictionary.ts"/>
 

namespace com 
{
    export class JTContextMap extends JTDictionary<string, JTBeanContext>
    {

        protected getObjectByClass(___class:any):JTBeanContext
        {
            return null;
        }

        public collect(__c:any, property:string, descripter:any):void
        {
            let __context:JTBeanContext = this.get(property);
            if (__context)
            {
                error("already inject " + property  + " bean object. need change other property name!");
            }
            __context = new JTBeanContext();
            this.set(property, __context);
            __context.bind(__c, property, descripter);
        }

        public changed(__sourceProperty:string, __changedProperty:string):void
        {
            let value:JTBeanContext = this.remove(__sourceProperty);
            value &&  this.set(__changedProperty, value)
        }

        public bind():void
        {

        }

        public registerContext():void
        {
         
        }
    }

    /**
     * 可选@Qualifier("propertyName")
     * Bean对象 配合Autowired一起使用
     * @param ___c 
     * @param property 
     * @param descripter 
     */
    export var Bean:Function = function(___c:any, property:string, descripter:any):void
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c.__caller, ___c.__property, ___c.__descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Bean, property, descripter, [___c, property, descripter])
        }
    };

    /**
     * 从
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
                JTApplicationContext.changed(__c.__property, __c.parameters[0]);
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
        let key:string = JTDecoratorUtils.registerDecoratorKey(__property);
		Object.defineProperty(__caller, __property, 
		{
			get: function () 
			{
				let val = this[key];
				if (val === null || val === undefined) 
				{
					let ____c:JTBeanContext = JTApplicationContext.get(changedProperty);
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

 

