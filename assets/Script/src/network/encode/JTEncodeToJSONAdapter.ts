namespace com 
{
    export class JTEncodeToJSONAdapter extends JTAbstractEncoderAdapter
    {
        constructor()
        {
            super();
        }

        public channelActive(): void 
        {
        }

        public encode(data:any):any 
        {
            return JSON.stringify(data);
        }

        public writeComplete(data:any): void 
        {
            super.writeComplete(data);
        }
    }
}
