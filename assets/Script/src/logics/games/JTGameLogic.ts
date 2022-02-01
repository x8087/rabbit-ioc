///<reference path="../JTLogic.ts"/>
module com 
{
    export abstract class JTGameLogic extends JTLogic implements JTIGameLogic
    {
        public _logicTime:number = 0;
        
        constructor()
        {
            super();
        }

        public get logicTime():number
        {
            return this._logicTime;
        }

    }
}
