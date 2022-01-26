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
		public __runnableMap:{[key:string]:JTDescripter} = null;

		constructor(__class:any)
		{
			super(__class);
			this.__runnableMethods = [];
			this.__runnablePropertys = [];
			this.__runnableMap = {};
		}

		public builds():void
		{
			this.assembles(this.__runnablePropertys);//组装属性注解
			this.assembles(this.__runnableMethods);//组装方法注解
			super.builds();// this.assemble();//组装Class类注解
		}

		public assemble():void 
		{
			
		}

		public assembles(lines:any):void 
		{
			if (!lines) lines = this.__elements;
			let total:number = lines.length;
			for (let i:number = 0; i < total; i++)
			{
				let element:JTDescripter = lines[i];
				element.builds();
			}
		}

		public run(): void 
		{
			this.runs(this.__runnablePropertys);//执行属性注解函数
			this.runs(this.__runnableMethods);//执行对象方法注解函数
			super.run();//执行CLASS注解函数
		}

		public runs(lines?:JTDescripter[]):void
		{
			let total:number = lines.length;
			for (let i:number = 0; i < total; i++)
			{
				 let element:JTDescripter = lines[i];
				 element.run();
			}
		}

		public collect(__emt:JTElementDescripter):void
        {
			let ___classContainer:any = __emt.getClassContainer();
			if (___classContainer == JTClassDescripter)
			{
				this.addElement(__emt);
			}
			else
			{
				let propertyName:string = __emt.property;
				let descripter:JTDescripter = this.__runnableMap[propertyName];
				if (!descripter)
				{
					descripter = new ___classContainer(__emt.cls, __emt.property);
					descripter instanceof JTPropertyDescripter? this.__runnablePropertys.push(descripter) : this.__runnableMethods.push(descripter);
					this.__runnableMap[propertyName] = descripter;
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


