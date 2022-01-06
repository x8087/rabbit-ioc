namespace com 
{
    export interface JTIProtocol
    {
        protocols:number[];

        encrypts:number[];

        build():void;

        registerProtocol(protocol:number, waiting:boolean, encrypt:boolean):void;

        getProtocol(protocol:number):JTItemProtocol;

        execute(message:any):void;
    }
}
