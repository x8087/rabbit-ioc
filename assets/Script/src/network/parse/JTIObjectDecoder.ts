module com
{
    export interface JTIObjectDecoder
    {
        readType():number

        readByte():number

        readInt():number

        readArray():any[]

        readMap():Object

        readObject():Object

        deserialize(bytes:com.JTBuffer):Object
    }
}
