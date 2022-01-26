/*
* name;
*/
module com
{
      export interface JTICachePool extends JTIPool
      {
            recycles(items?:JTIPoolObject[]):void;
      }
}