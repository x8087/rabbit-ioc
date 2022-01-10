namespace com 
{
    export class JTMapper implements JTIMapper
    {

        /***
         * 只支持简单数据类型的深度复制,复杂数据类型为引用关系
         * 如果想要深度复制复杂数据请重写此方法
         **/
        public clone():JTMapper
        {
            var dataInfo:JTMapper = new JTMapper();
            dataInfo.update(this);
            return this;
        }

        public update(data:Object):JTMapper
        {
            var keys:string[] = Object.keys(data);
            var obj:Object = this ;
            var l:number = keys.length;
            for (var i:number = 0; i < l; i++)
            {
                var key:string = keys[i];
                if (obj.hasOwnProperty(key))
                {
                    this[key] = data[key];
                }
            }
            return this;
        }

        /***
         * 回收重写此方法
         */
        public recycle():void{};
    }
}