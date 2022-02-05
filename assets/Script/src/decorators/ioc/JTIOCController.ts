///<reference path="../../structure/JTDictionary.ts"/>
/*
* name;
*/
module com 
{
	export class JTIocController extends JTDictionary<string, JTDescripter>
	{
		constructor()
		{
			super();
		}

		public build():void
		{
			let lines:JTDescripter[] = this._values;
			for (let i:number = 0; i < lines.length; i++)
			{
				let descripter:JTDescripter = lines[i] as JTDescripter;
				descripter.builds();
			}
		}

		public run():void
		{
			let lines:JTDescripter[] = this._values;
			for (let i:number = 0; i < lines.length; i++)
			{
				let descripter:JTDescripter = lines[i] as JTDescripter;
				descripter.run();
			}
		}

		public makeClassMap(__emt:JTElementDescripter):void
		{
			let __className:string = __emt.className;
			let __classDescripter:JTClassDescripter = this.get(__className) as JTClassDescripter;
			if (!__classDescripter)
			{
				__classDescripter = new JTClassDescripter(__emt.cls);
				this.set(__className, __classDescripter)
			}
			__classDescripter.collect(__emt);
		}
	}
}


