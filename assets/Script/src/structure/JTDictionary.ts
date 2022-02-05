module com 
{
    export class JTDictionary<K, V>
    {
		protected _keys:K[] = null;
        protected _values:V[] = null;

		constructor()
		{
			this._values = [];
			this._keys = [];
		}

		public get values():V[] 
        {
			return this._values;
		}

		public get size():number
		{
			return this._values.length;
		}
		
		public get keys():K[] 
        {
			return this._keys;
		}
		
		public set(key:K, value:V):void 
        {
			var index:number = this.indexOf(key);
			if (index >= 0) 
            {
				this._values[index] = value;
				return;
			}
			this._keys.push(key);
			this._values.push(value);
		}
		
		public indexOf(key:K):number 
        {
			var index:number = this._keys.indexOf(key);
            return index;

		}
		
		public get(key:K):V
        {
			var index:number = this.indexOf(key);
			return index < 0 ? null : this._values[index];
		}
 
		public remove(key:K):V
         {
			var index:number = this.indexOf(key);
			var value:V = null;
			if (index >= 0) 
            {
				this._keys.splice(index, 1);
				value = this._values.splice(index, 1).shift();
			}
			return value;
		}

		public removeAt(index:number):V
		{
		   var value:V = null;
		   if (index >= 0) 
		   {
			   this._keys.splice(index, 1);
			   value = this._values.splice(index, 1).shift();
		   }
		   return value;
	   }

		public last():V
		{
			let size:number = this._values.length;
			if (size > 0)
			{
				return this._values[size - 1]
			}
			return null;
		}

		public shift():V
		{
			let size:number = this._values.length;
			if (size > 0)
			{
				this._keys.shift();
				return this._values.shift();
			}
			return null;
		}

		public pop():V
		{
			let size:number = this._values.length;
			if (size > 0)
			{
				this._keys.pop();
				return this._values.pop();
			}
			return null;
		}

		public clear():void 
        {
			this._values.length = 0;
			this._keys.length = 0;
		}
    }
}