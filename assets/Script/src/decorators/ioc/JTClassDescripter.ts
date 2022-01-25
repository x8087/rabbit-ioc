///<reference path="base/JTDescripter.ts"/>
/*
* name;
*/
module com 
{
	export class JTClassDescripter extends JTDescripter
	{
		public __runnablePropertys:JTDescripter[] = null;//属性描述列表
		public __runnableMethods:JTDescripter[] = null;//方法描述列表

		public __descripterMap:{[key:string]:JTDescripter} = null;

		constructor(__class:any)
		{
			super(__class);
			this.__runnableMethods = [];
			this.__runnablePropertys = [];
			this.__descripterMap = {};
		}

		public run(): void 
		{
			super.run(this.__runnablePropertys);
			super.run(this.__runnableMethods);
			super.run();
		}

		public assemble(__emt:JTElementDescripter):void
        {
			let ___classContainer:any = __emt.getClassContainer();
			if (___classContainer == JTClassDescripter)
			{
				this.addElement(__emt);
			}
			else
			{
				let propertyName:string = __emt.property;
				let descripter:JTDescripter = this.__descripterMap[propertyName];
				if (!descripter)
				{
					descripter = new ___classContainer(__emt.cls, __emt.property);
					___classContainer == JTPropertyDescripter? this.__runnablePropertys.push(descripter) : this.__runnableMethods.push(descripter);
				}
				descripter.addElement(__emt);
			}
        }

		public getNameByClass(__c:any):string
		{		
			return __c["constructor"].name;
		}
	}
}


