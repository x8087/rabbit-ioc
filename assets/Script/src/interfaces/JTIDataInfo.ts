

/*
* name;
*/
namespace com 
{
    export interface JTIDataInfo extends JTIPoolObject
    {

        update(data:any):JTIDataInfo;


        /***
         * 只支持简单数据类型的深度复制,复杂数据类型为引用关系
         * 如果想要深度复制复杂数据请重写此方法
         **/
        clone():JTIDataInfo;
    }
}