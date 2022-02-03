module com 
{

    export var Services:Function = function()
    {
        let parameters = arguments

        return function(caller:any, property:string, descripter?:any)
        {
            let configurable = arguments
            info("Services" + parameters, configurable)
        }
    }

    export var Scene:Function = function()
    {
        let parameters = arguments

        return function(caller:any, property:string, descripter?:any)
        {
            let configurable = arguments
            info("Scene: " + parameters, configurable);
        }
    }

    export var Component:Function = function(___c:any, property:string, descripter:any)
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Component, property, descripter, [___c, property, descripter])
        }
    }

    export var Panel:Function = function(___c:any, property:string, descripter:any)
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Panel, property, descripter, [___c, property, descripter])
        }
    }

    export var DataInfoManager:Function = function(___c:any, property:string, descripter:any)
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Panel, property, descripter, [___c, property, descripter])
        }
    }

    export var Data:Function = function(___c:any, property:string, descripter:any)
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Panel, property, descripter, [___c, property, descripter])
        }
    }

    export var Pool:Function = function(___c:any, property:string, descripter:any)
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Panel, property, descripter, [___c, property, descripter])
        }
    }

    export var Singleton:Function = function(___c:any, property:string, descripter:any)
    {
        if (___c instanceof JTConfigDescripter)
        {
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
        }
        else
        {
            JTApplicationContext.collect(___c, Panel, property, descripter, [___c, property, descripter])
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
            JTApplicationContext.collectToMap(___c._class, ___c._property, ___c._descripter);
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
            if (!__c._descripter) //属性获取时，先修改对属性获取BEAN对象的属性名;
            {
                // Object.defineProperty(__c.__caller, __c.__property, {});
                doAutowired(__c._class, __c._property, __c.parameters[0]);
            }
            else //方法或者类
            {
                JTApplicationContext.changed(__c._property, __c.parameters[0]);
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
                doAutowired(__c._class, __c._property, __parameters[2])
            }
            else
            {
                doAutowired(__c._class, __c._property, __c._property)
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
					let ____c:JTBean = JTApplicationContext.get(changedProperty);
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

 

