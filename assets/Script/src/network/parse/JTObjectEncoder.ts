module com 
{
    export class JTObjectEncoder extends JTObjectCoder implements JTIObjectEncoder
    {

        public writeString(content:string):void
        {
            this.writeType(JTObjectType.STRING);
            this.buffer.writeByte(JTBuffer.stringLength(content));
            this.buffer.writeUTFBytes(content)
        }

        public writeInt(value:number):void
        {
            this.writeType(JTObjectType.INT);
            this.buffer.writeInt32(value);
        }

        public writeByte(value:number):void
        {
            this.writeType(JTObjectType.BYTE);
            this.buffer.writeByte(value);
        }

        public writeType(type:number):void
        {
            this.buffer.writeByte(type);
        }

        public writeMap(valueMap:Object):void
        {
            this.writeType(JTObjectType.MAP);
        }

        public writeArray(values:any[]):void
        {
            this. writeType(JTObjectType.ARRAY);
            let count:number = values.length;
            this.buffer.writeByte(count);
            for (let i:number = 0; i < count; i++)
            {
                let value:Object = values[i];
                this.buffer.writeByte(i);
                this.writeObject(value);
            }
        }

        public writeObject(value:any):void
        {
            if (typeof value == 'string')
            {
                this.writeString(value);
            }
            else if (typeof value == 'number')
            {
                this.writeInt(value);
            }
            else if (typeof value == 'boolean')
            {
                this.writeBoolean(value);
            }
            else if (Array.isArray(value))
            {
                this.writeArray(value);
            }
            else if (typeof value == 'object')
            {
                this.writeMap(value);
            }
            else
            {
                this.writeJSON(value);
            }
        }

        private writeBoolean(value:boolean):void
        {
            this.writeType(JTObjectType.BOOLEAN);
            this.buffer.writeByte(value == true ? 1 : 0);
        }

        public serialize(value:Object):void
        {
            this.writeObject(value);
        }

        public writeJSON(value:Object):void
        {

        }
    }
}
