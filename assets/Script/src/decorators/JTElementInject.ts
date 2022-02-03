module com 
{
    export class JTElementInject
    {
        public _runnbleMethod:Function = null;
        public _configDescripter:JTConfigDescripter = null;

        public inject():void
        {
            this._runnbleMethod && this._runnbleMethod.apply(this.caller, [this._configDescripter]);
        }

        public compare(element:JTElementInject):boolean
        {
            return false;
        }

        public merge(element:JTElementInject):void
        {
                
        }

        public get caller():any
        {
            return this._configDescripter._class;
        }

        public get paramters():any
        {
            return this._configDescripter.parameters;
        }

        public get property():string
        {
            return this._configDescripter._property;
        }

        public get descripter():JTConfigDescripter
        {
            return this._configDescripter._descripter;
        }
    }
}