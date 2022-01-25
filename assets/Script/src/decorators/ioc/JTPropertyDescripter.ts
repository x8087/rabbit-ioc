///<reference path="base/JTDescripter.ts"/>
/*
* name;
*/
module com 
{
	export class JTPropertyDescripter extends JTDescripter
	{
		public assemble(): void 
		{
			let autowriedIndex:number = this.___dependencies.indexOf(Autowired);
			let qualifierIndex:number = this.___dependencies.indexOf(Qualifier);
			if (qualifierIndex > -1 && autowriedIndex > -1)
			{
				let qualifierElement:JTElementDescripter = this.__elements[qualifierIndex];
				let autowriedElement:JTElementDescripter = this.__elements[autowriedIndex];
				this.mergeParameter(qualifierElement.parameters, autowriedElement.parameters);
				JTElementDescripter.put(qualifierElement);
				this.__elements.splice(qualifierIndex);
			}
		}

		/**
		 * 合并注解的参数使其变为一个注解
		 * @param qualifier 
		 * @param autowried 
		 */
		private mergeParameter(qualifier:any[], autowried:any[]):void
		{
			autowried.push(qualifier[0]);
		}
	}
}


