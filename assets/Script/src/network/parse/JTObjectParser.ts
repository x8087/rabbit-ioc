module com 
{
    export class JTObjectParser
    {
        private decoder:JTIObjectDecoder = null;
        private encoder:JTIObjectEncoder = null;
        private buffer:com.JTBuffer = null;

        private static parser:JTObjectParser = new JTObjectParser();


        constructor()
        {
            this.buffer = JTBuffer.create();
            this.decoder = new JTObjectDecoder(this.buffer);
            this.encoder = new JTObjectEncoder(this.buffer);
        }

        public toBytes(data:any):JTBuffer
        {
            this.buffer.clear();
            this.encoder.serialize(data);
            this.buffer.pos = 0;
            return  this.buffer;
        }

        public parse(data:JTBuffer):Object
        {
            this.buffer.pos = 0;
            return  this.decoder.deserialize(data);
        }

        public static serialize(data:any):JTBuffer
        {
            return  this.parser.toBytes(data);
        }

        public static deserialize(data:JTBuffer):any
        {
            return this.parser.parse(data);
        }
    }
}
