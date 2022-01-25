/*
* name;
*/
module com 
{
	export class JTDescripter
	{
		public __class:any = null;
		public __property:string = null;
		public __descripters:JTElementDescripter[] = null;
		private __className:string = null;
		private __key:string = null;

		constructor(_class:any, _property?:string)
		{
			this.__descripters = [];
			this.__class = _class;
			this.__property = _property;
			this.__className = _class["constructor"].name;
			this.__key = this.__className + _property ?  _property : "";
		}

		public get className():string
		{
			return this.__className;
		}

		public get dependKey():string
		{
			return this.__key;
		}

	}
}


