module com 
{
    export class JTObjectParser
    {
        private decoder:JTIObjectDecoder = null;
        private encoder:JTIObjectEncoder = null;
        private buffer:com.JTBuffer = null;

        public static parser:JTObjectParser = new JTObjectParser();

        public JTObjectParser()
        {
            this.buffer = JTBuffer.create();
            this.decoder = new JTObjectDecoder( this.buffer);
            this.encoder = new JTObjectEncoder( this.buffer);
        }

        public  toByteBuf(data:any):JTBuffer
        {
            this.buffer.clear();
            this.encoder.serialize(data);
            return  this.buffer;
        }

        public parse(data:JTBuffer):Object
        {
            return  this.decoder.deserialize(data);
        }

        public static serialize(data:any):JTBuffer
        {
            return  this.parser.toByteBuf(data);
        }

        public static deserialize(data:JTBuffer):any
        {
            return this.parser.parse(data);
        }
    }
}
