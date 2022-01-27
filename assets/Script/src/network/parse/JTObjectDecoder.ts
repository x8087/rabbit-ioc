module com 
{
    export class JTObjectDecoder extends JTObjectCoder implements JTIObjectDecoder
    {



        public readType():number
        {
            return this.buffer.readByte();
        }

        public readByte():number
        {
            return this.buffer.readByte();
        }

        public readInt():number
        {
            return this.buffer.readInt32();
        }

        public readArray():any[]
        {
            let count:number = this.buffer.readByte();
            let list:any[] = []
            for (let i:number = 0; i < count; i++)
            {
                let index:number = this.readByte();
                let value:any = this.readObject();
                list[index] = value;
            }
            return list;
        }

        public readMap():Object
        {
            return null;
        }

        public readObject():any
        {
            let type:number = this.buffer.readByte();
            let value:any = null;
            switch (type)
            {
                case JTObjectType.INT:
                {
                    value = this.readInt();
                    break;
                }
                case JTObjectType.ARRAY:
                {
                    value = this.readArray();
                    break;
                }
                case JTObjectType.JSON:
                {
                    value = this.readJSON();
                    break;
                }
                case JTObjectType.MAP:
                {
                    value = this.readMap();
                    break;
                }
                case JTObjectType.STRING:
                {
                    value = this.readString();
                    break;
                }
                case JTObjectType.BOOLEAN:
                {
                    value = this.readBoolean();
                    break;
                }
                default
                        :
                    throw new Error("Unexpected value: " + type);
            }
            return value;
        }

        private readBoolean():boolean
        {
            return this.buffer.readByte() == 1 ? true : false;
        }

        private  readString():string
        {
            let length:number = this.buffer.readByte();
            let content:string = this.buffer.readUTFBytes(length)
            return content;
        }

        public deserialize(bytes:JTBuffer):Object
        {
            return this.readObject();
        }

        public readJSON():Object
        {
            return null;
        }

        public read():Object
        {
            return null;
        }
    }
}
