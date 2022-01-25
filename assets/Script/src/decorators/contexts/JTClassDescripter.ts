///<reference path="base/JTDescripter.ts"/>
/*
* name;
*/
module com 
{
	export class JTClassDescripter extends JTDescripter
	{
		public __propertys:JTDescripter[] = null;//属性描述列表

		public __descripterMap:{[key:string]:JTDescripter} = null;
		public __methods:JTDescripter[] = null;//方法描述列表

		constructor(__class:any)
		{
			super(__class);
			this.__methods = [];
			this.__propertys = [];
			this.__descripterMap = {};
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
					___classContainer == JTPropertyDescripter? this.__propertys.push(descripter) : this.__methods.push(descripter);
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


