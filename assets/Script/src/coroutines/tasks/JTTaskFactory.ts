module com 
{
    export abstract class JTTaskFactory implements JTIFactory
    {
        public abstract produce():JTIRunnable;
    }   
}