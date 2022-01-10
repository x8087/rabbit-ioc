namespace com 
{
    export abstract class JTTask implements JTITask
    {
        public abstract execute():Promise<any>;

        recycle() 
        {
        }
    }
}