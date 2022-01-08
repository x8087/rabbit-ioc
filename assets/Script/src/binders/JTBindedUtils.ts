

/*
* name;
*/
module com 
{
	export class JTBindedUtils 
	{
		 private static _bindMap:{[name:string] : JTSingletonInfo} = {};

		 public static bind(cls:any, target:any):void
		 {
				let name:string = cls["constructor"].name;
				let bindInfo:JTSingletonInfo = this._bindMap[name];
				if (!bindInfo)
				{
					bindInfo = new JTSingletonInfo();
					this._bindMap[name] = bindInfo;
					bindInfo.cls = cls;
					bindInfo.target = target;
					bindInfo.refrenses = [];
				}
		 }
	}
}


