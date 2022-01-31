module com 
{
    /**
     * 任务基类
     */
    export class JTExecutor
    {
       
        public static cacheTaskExecutor():JTAsyncTaskPipeline
        {
            return new JTAsyncTaskPipeline();
        }
    }
}