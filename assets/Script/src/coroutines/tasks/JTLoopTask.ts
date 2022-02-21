///<reference path= "../tasks/JTRunnableTask.ts"/>
module com 
{
    /**
     * 任务基类
     */
    export abstract class JTLoopTask extends JTRunnableTask
    {
        constructor()
        {
            super();
            this._loop = 0;
        }
    }
}