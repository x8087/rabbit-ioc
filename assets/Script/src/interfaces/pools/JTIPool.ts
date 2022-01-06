/*
* name;
*/
namespace com
{
      export interface JTIPool
      {
            get():JTIPoolObject

            put(item:JTIPoolObject):void

            totalCount:number;

            size:number;
      }
}