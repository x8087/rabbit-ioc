# Rabbit-IOC
 
支持cocos creator 2.4.7及以下的版本（3.0以上的版本要把命名空间--namespace 去掉、GULP和TSCONFIG都需要做一些调整 ）、LAYA、Egret等前端游戏引擎
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Rabbit-IOC 是一个跨引擎的前端框架(注入、注解、Mapping映射、控制反转、帧同步、优化帧、计时器、均摊、帧均摊、携程、线程、对象池、Websocket、Template、计数器、引用计数、pomise\yeild等技术封装)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  JTPool--传统对象池
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //创建方法 一:
        // c.JTDataInfo 必须实现JTIPoolObject接口
        let pool:c.JTIPool = c.JTPool.instance(c.JTDataInfo);

        //从对象池获取对象
        let dataInfo:c.JTDataInfo = pool.get();

        /**
         * 将对象放入对象池中
         */
        pool.put(dataInfo);

        pool.size //当前对象池可用对象数
        pool.totalCount //当前对象池一共创建了多少个对象
        
        //创建方法二:
        @c.SingletonPool(c.JTPool, c.JTDataInfo) 
        protected pool:c.JTIPool = null;
        
JTCachePool--缓存对象池(每一个由该对象池创建的对象都会在池中留一个引用)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //普通创建方法
        // c.JTDataInfo 必须实现JTIPoolObject接口
        let pool:c.JTICachePool = c.JTCachePool.instance(c.JTDataInfo, 100);
        pool.recycles() //如果传指定数组，则会回收数组中的对象，如果不传数组则会一键回收所有对象到池中
        //从对象池获取对象
        let dataInfo:c.JTDataInfo = pool.get();
        /**
         * 将对象放入对象池中
         */
        pool.put(dataInfo);
        pool.size //当前对象池可用对象数
        pool.totalCount //当前对象池一共创建了多少个对象
         
        @c.SingletonPool(c.JTCachePool, c.JTDataInfo) //注入创建对象池
        protected pool:c.JTICachePool = null;
 JTFixedPool--固定对象池(在创建对象池时会直接先创建一定个数的对象在池里)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        //普通创建方法
        // c.JTDataInfo 必须实现JTIPoolObject接口
        let pool:c.JTIFixedPool = c.JTFixedPool.instance(c.JTDataInfo, 100);

        pool.fullPool//--是否满
        pool.fixedCount // --创建多个对象在池里

        pool.recycles() //如果传指定数组，则会回收数组中的对象，如果不传数组则会一键回收所有对象到池中

        //从对象池获取对象
        let dataInfo:c.JTDataInfo = pool.get();

        /**
         * 将对象放入对象池中
         */
        pool.put(dataInfo);

        pool.size //当前对象池可用对象数
        pool.totalCount //当前对象池一共创建了多少个对象
         
        @c.SingletonPool(c.JTFixedPool, c.JTDataInfo, 100) //注入创建对象池
        protected pool:c.JTIFixedPool = null;
        
 JTEvent--事件(不支持冒泡)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //由对象池创建
        let event:c.JTEvent = c.JTEvent.create(this, test, {}, true)

        function test():void
        {

        }
        //new 创建
        let event:c.JTEvent = new c.JTEvent();
        event.setTo(this, test, null, false)


        let result:any = event.run();//可返回结果，不带参数运行回调

        let result:any = event.runWith(data);//可返回结果，带参数运行回调

        c.JTEvent.put(event)//回收事件对象
 JTFunctionManager--全局函数（主要用于通信事件）
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        //注册全局函数
        c.JTFunctionManager.registerFunction("10000", test, this)

        function test(result:any):void
        {
            console.info(result)
        }
        //执行全局函数
        c.JTFunctionManager.execute("10000", "hello world!")
        
        c.JTFunctionManager.removeFunction("10000", test, this)//移除单个全局函数
        c.JTFunctionManager.removeFunctions("10000")//移除指定KEY的所有全局函数
        
JTEventManager--全局事件（主要用于通知 (刷新/更新) 视图）
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        //注册全局事件
        c.JTEventManager.addEventListener("updateView", test, this)
        
        function test(result:any):void
        {
            console.info(result)
        }
        //执行全局事件
        c.JTEventManager.dispathEvent("updateView", "hello world!")
        c.JTEventManager.removeEventListener("updateView", test, this)//移除单个全局事件
        c.JTEventManager.removeEvents("updateView",)//移除指定KEY的所有全局事件
JTEventDispatcher--事件派发器（一些自定义对象需要事件派发提供继承扩展使用）
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        let dispatcher:c.JTEventDispatcher = new c.JTEventDispatcher();
        //注册事件
        dispatcher.addEventListener("updateView", test, this)
        function test(result:any):void
        {
            console.info(result)
        }
    
      dispatcher.dispathEvent("updateView", "hello world!")    //执行自定义事件
      dispatcher.removeEventListener("updateView", test, this)//移除单个事件
      dispatcher.removeEvents("updateView",)//移除指定KEY的所有事件
      dispatcher.removes();//移除所有事件
JTEventSignaler--全局信号器（该对象能派发、接收全局事件和函数---在框架中提供给视图层和数据层）
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        let signaler:c.JTEventSignaler = new c.JTEventSignaler();
        //注册全局事件
        signaler.addEventListener("updateView", test, this)
        //注册全局函数
        signaler.registerFunction("10000", test, this)
        function test(result:any):void
        {
            console.info(result)
        }
      signaler.executeFunction("10000", "hello world!")
      signaler.dispathEvent("updateView", "hello world!")    //执行自定义事件
      
      signaler.removeEventListener("updateView", test, this)//移除单个事件
      signaler.removeEvents("updateView",)//移除指定KEY的所有事件
      signaler.removes();//移除所有事件和函数...等
