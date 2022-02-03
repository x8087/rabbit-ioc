/*
* name;
*/
module com 
{
	export abstract class JTDescripter
	{
		public _class:any = null;
		public _property:string = null;
		public _elements:JTElementDescripter[] = null;
		private _className:string = null;
		protected _dependencies:Function[] = null;

		constructor(_cls:any, _property?:string)
		{
			this._elements = [];
			this._dependencies = [];
			this._class = _cls;
			this._property = _property;
			this._className = _cls["constructor"].name;
		}


		public abstract assemble():void

		public builds() 
		{
			this.assemble();
		}
	 
		public run(lines?:JTElementDescripter[]):void
		{
			if (!lines) lines = this._elements;
			let total:number = lines.length;
			for (let i:number = 0; i < total; i++)
			{
				 let element:JTElementDescripter = lines[i];
				 element.run();
			}
		}

		public addElement(element:JTElementDescripter):void
		{
			let index:number = this._elements.push(element);	 
			this._dependencies[index - 1] = element.runnable;
		}

		public get className():string
		{
			return this._className;
		}
	}
}


