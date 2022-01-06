namespace com 
{
    export class JTProtocol implements JTIProtocol
    {
        private _protocols:number[] = null;

        private _encrypts:number[] = null;

        private _protocolMap:Object = null;
        
        public static NORMAL:number = 1;
        public static ERROR:number = 0;

        constructor()
        {
            this._protocols = [];
            this._protocolMap = {};
            this.build();
        }

        public build(): void 
        {
            
   
        }


        /**
         * 
         * @param protocol 协议号
         * @param waiting 是否显示隐藏通信转圈
         * @param encrypt 是否显示加解密的转圈
         */
        public registerProtocol(protocol:number, waiting:boolean, encrypt:boolean):void 
        {
               this._protocolMap[protocol] = JTItemProtocol.create(protocol, waiting, encrypt)
               waiting && this._protocols.push(protocol);
        }

        /**
         * 同时拥有加解密功能的协议号列表
         * 
         */
        public get protocols():number[]
        {
            return this._protocols;
        }

        public get encrypts():number[]
        {
            return this._encrypts;
        }

        public getProtocol(protocol:number):JTItemProtocol
        {
            return this._protocolMap[protocol];
        }

        public execute(message: any): void 
        {
 
        }
    }
}
