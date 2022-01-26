/*
* name;
*/
module com
{
      export interface JTIFixedPool extends JTICachePool
      {
            fullPool:boolean;
            
            fixedCount:number;
      }
}