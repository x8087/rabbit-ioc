namespace com 
{
    export class JTItemProtocol
    {
         private _isWaiting:boolean = false;
         private _isEncrypt:boolean = false;
         private _protocol:number = 0;

         constructor(protocol:number)
         {
            this._protocol = protocol;
         }

         public setup(isWaiting:boolean, isEncrypt:boolean):void
         {
            this._isEncrypt = isEncrypt;
            this._isWaiting = isWaiting;
         }

         public static create(protocol:number, isWaiting:boolean, isEncrypt:boolean):JTItemProtocol
         {
               var item:JTItemProtocol = new JTItemProtocol(protocol);
               item.setup(isWaiting, isEncrypt);
               return item;
         }

         public get protocol():number
         {
             return this._protocol;
         }

         public get isEncrypt():boolean
         {
             return this._isEncrypt;
         }

         public get isWaiting():boolean
         {
             return this._isWaiting;
         }

         public hide(message:any):void
         {

         }

         public decrypt(message:any):any
         {
            return message;
         }
    }
}
