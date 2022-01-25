/*
* name;
*/
module com 
{
	export abstract class JTDescripter
	{
		public ____c:any = null;
		public __property:string = null;
		public __elements:JTElementDescripter[] = null;
		private __className:string = null;
		protected ___dependencies:Function[] = null;

		constructor(___caller:any, _property?:string)
		{
			this.__elements = [];
			this.___dependencies = [];
			this.____c = ___caller;
			this.__property = _property;
			this.__className = ___caller["constructor"].name;
		}


		public abstract assemble():void

		public builds() 
		{
			this.assemble();
		}
	 
		public run(lines?:JTElementDescripter[]):void
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
			let index:number = this.__elements.push(element);	 
			this.___dependencies[index - 1] = element.runnable;
		}

		public get className():string
		{
			return this.__className;
		}
	}
}


