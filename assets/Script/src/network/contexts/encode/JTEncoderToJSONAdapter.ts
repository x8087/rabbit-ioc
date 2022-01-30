module com 
{
    export class JTEncoderToJSONAdapter extends JTAbstractEncoderAdapter
    {
        // public build(): void 
        // {
          
            
        // }
        
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
