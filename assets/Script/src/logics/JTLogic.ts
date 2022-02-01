module com 
{
    export abstract class JTLogic implements JTILogic
    {
        protected _currentLogic:string | number = null;
        protected _index:number = 0;
        protected _controller:JTLogicController = null;
        constructor()
        {
        }

        public abstract updateLogic():void;

        public get index():number
        {
            return this._index;
        }

        public set index(value:number)
        {
            this._index = value;
        }
        
        public get controller():JTLogicController
        {
            return this._controller;
        }

        public get currentLogic():string | number
        {
            return this._currentLogic;
        }
    }
}
