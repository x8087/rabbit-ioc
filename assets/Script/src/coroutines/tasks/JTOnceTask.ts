module com 
{
    /**
     * 任务基类
     */
    export abstract class JTOnceTask extends JTRunnableTask
    {
        constructor()
        {
            super();
            this._loop = 1;
        }
    }
}