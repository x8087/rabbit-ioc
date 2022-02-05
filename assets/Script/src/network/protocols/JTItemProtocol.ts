module com 
{
    export class JTItemProtocol
    {
         private _isWaiting:boolean = false;
         private _securityOption:string = null;
         private _protocol:number | string = 0;

         constructor(protocol:number | string)
         {
            this._protocol = protocol;
         }

         public setup(isWaiting:boolean, security?:string):void
         {
            this._securityOption = security;
            this._isWaiting = isWaiting;
         }

         public static create(protocol:number | string, isWaiting:boolean, security?:string):JTItemProtocol
         {
            var item:JTItemProtocol = new JTItemProtocol(protocol);
            item.setup(isWaiting, security);
            return item;
         }

         public get protocol():number | string
         {
             return this._protocol;
         }

         public get securityOption():string
         {
             return this._securityOption;
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
