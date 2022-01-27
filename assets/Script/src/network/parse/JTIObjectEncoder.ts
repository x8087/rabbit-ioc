module com
{
        export interface JTIObjectEncoder
        {
                writeString(content:string):void

                writeInt(value:number):void

                writeByte(value:number):void

                writeMap(valueMap:Object):void

                writeArray(values:any[]):void

                writeObject(value:Object):void

                serialize(value:Object):void

        }
}
