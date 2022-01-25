namespace com 
{
    export class JTDictionary<K, V>
    {
        protected  _values:V[] = [];
		protected  _keys:K[] = [];

		/**
		 * 获取所有的子元素列表。
		 */
		public get values():V[] 
        {
			return this._values;
		}
		
		/**
		 * 获取所有的子元素键名列表。
		 */
		public get keys():K[] 
        {
			return this._keys;
		}
		
		/**
		 * 给指定的键名设置值。
		 * @param	key 键名。
		 * @param	value 值。
		 */
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
		
		/**
		 * 获取指定对象的键名索引。
		 * @param	key 键名对象。
		 * @return 键名索引。
		 */
		public indexOf(key:K):number 
        {
			var index:number = this._keys.indexOf(key);
            return index;
			// if (index >= 0) return index;
			// key = (typeof key == 'string') ? Number(key) : ((typeof key == 'number') ? key.toString() : key);
			// return this._keys.indexOf(key);
		}
		
		/**
		 * 返回指定键名的值。
		 * @param	key 键名对象。
		 * @return 指定键名的值。
		 */
		public get(key:K):V
        {
			var index:number = this.indexOf(key);
			return index < 0 ? null : this._values[index];
		}
		
		/**
		 * 移除指定键名的值。
		 * @param	key 键名对象。
		 * @return 是否成功移除。
		 */
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
		
		/**
		 * 清除此对象的键名列表和键值列表。
		 */
		public clear():void 
        {
			this._values.length = 0;
			this._keys.length = 0;
		}
    }
}