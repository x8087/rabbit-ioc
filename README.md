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
        @c.SingletonPool(c.JTPool, c.JTData) 
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
         
        @c.SingletonPool(c.JTCachePool, c.JTData) //注入创建对象池
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
         
        @c.SingletonPool(c.JTFixedPool, c.JTData) //注入创建对象池
        protected pool:c.JTIFixedPool = null;
        

