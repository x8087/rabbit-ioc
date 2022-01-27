
module com 
{
    export class JTObjectCoder
    {
        constructor(bytes:JTBuffer)
        {
            this.buffer = bytes;
        }

        protected buffer:JTBuffer;

        public getBuffer():JTBuffer
        {
            return this.buffer;
        }
    }
}
