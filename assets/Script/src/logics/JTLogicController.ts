module com 
{
    export abstract class JTLogicController
    {
        protected _logics:JTILogic[] = null;
        protected _currentIndex:number = 0;
        protected _taskCount:number = 0;
        protected _runningLogic:JTILogic = null;

        constructor()
        {
            this._logics = [];
        }

        public registerToController(logic:JTILogic):void
        {
            logic.index = this._logics.length;
           this._taskCount = this._logics.push(logic);
        }

    }
}
