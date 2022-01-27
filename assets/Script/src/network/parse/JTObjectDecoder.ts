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
                case JTDataClass.CLASS_Int:
                {
                    value = this.readInt();
                    break;
                }
                case JTDataClass.CLASS_ARRAY:
                {
                    value = this.readArray();
                    break;
                }
                case JTDataClass.CLASS_JSON:
                {
                    value = this.readJSON();
                    break;
                }
                case JTDataClass.CLASS_Map:
                {
                    value = this.readMap();
                    break;
                }
                case JTDataClass.CLASS_String:
                {
                    value = this.readString();
                    break;
                }
                case JTDataClass.DATA_Boolean:
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
