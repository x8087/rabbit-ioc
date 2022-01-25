/*
* name;
*/
module com 
{
	export class JTDescripter
	{
		public __class:any = null;
		public __property:string = null;
		public __elements:JTElementDescripter[] = null;
		private __className:string = null;
		private __key:string = null;

		constructor(_class:any, _property?:string)
		{
			this.__elements = [];
			this.__class = _class;
			this.__property = _property;
			this.__className = _class["constructor"].name;
			this.__key = this.__className + _property ?  _property : "";
		}

		public run(lines?:any):void
		{
			if (!lines) lines = this.__elements;
			let total:number = lines.length;
			for (let i:number = 0; i < total; i++)
			{
				 let element:JTElementDescripter = lines[i];
				 element.run();
			}
		}

		public addElement(element:JTElementDescripter):void
		{
			 this.__elements.push(element);	 
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


