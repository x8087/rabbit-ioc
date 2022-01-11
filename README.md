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
 JTFixedPool--固定对象池(在创建对象池时会直接先创建一定个数的对象在池里)
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        /**
         *创建方法
         */
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
         
        @c.SingletonPool(c.JTPool, c.JTData) //注入创建对象池
        protected pool:c.JTIPool = null;
        

