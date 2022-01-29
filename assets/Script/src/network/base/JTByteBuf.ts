module com
{
    export class JTByteBuf
    {
        public buffer:ArrayBuffer = null;
        public pos:number = 0;
        public length:number = 0;
        protected _bytes:DataView = null;


        constructor()
        {
            this._bytes = new DataView(this.buffer, 0, this.buffer.byteLength);
        }

        public clear():void
        {

        }

        public writeByte(value:number):void
        {
       
        }

        public writeBytes():void
        {

        }

        public writeUTFBytes():void
        {
 
        }

        public writeBoolean(value:boolean):void
        {

        }

        public writeNumber():void
        {

        }

        public readUTFBytes(lenght:number):string
        {
              return null;
        }

        public readByte():number
        {
            return 0;
        }

        // public readInt():number
        // {
        //     return this._bytes.get;
        // }

        public readNumber():number
        {
            return 0;
        }

        public readBoolean():boolean
        {
            return false;
        }
    }
}
