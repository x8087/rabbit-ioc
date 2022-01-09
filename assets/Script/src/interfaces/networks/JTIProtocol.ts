namespace com 
{
    export interface JTIProtocol
    {
        protocols:number[];

        encrypts:number[];

        build():void;

        registerProtocol(protocol:number, waiting:boolean, encrypt?:string):void;

        getProtocol(protocol:number):JTItemProtocol;

        execute(message:any):void;
    }
}
